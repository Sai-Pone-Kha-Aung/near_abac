import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/listings",
]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAuthRoute = createRouteMatcher(["/profile(.*)"]);
const isProtectedApiRoute = createRouteMatcher(["/api/listings"]);

type UserMetadata = {
  role: string;
};

const userSyncCache = new Map<string, number>();
const SYNC_COOLDOWN = 5 * 60 * 1000; // 5 minutes

async function syncUserToSupabase(userId: string) {
  // Check if user was recently synced
  const lastSync = userSyncCache.get(userId);
  if (lastSync && Date.now() - lastSync < SYNC_COOLDOWN) {
    return;
  }

  try {
    const supabase = await createClient();
    const clerk = await clerkClient();

    const userPromise = clerk.users.getUser(userId);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Clerk user fetch timed out")), 5000)
    );

    const user = (await Promise.race([userPromise, timeoutPromise])) as any;

    const userData = {
      id: userId,
      email: user.emailAddresses[0]?.emailAddress || "",
      first_name: user.firstName,
      last_name: user.lastName,
      image_url: user.imageUrl,
      role: (user.publicMetadata as UserMetadata)?.role || "moderator",
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("users")
      .upsert(userData, { onConflict: "id" });

    if (error) {
      console.error("Error upserting user to Supabase:", error);
    }
  } catch (error) {
    console.error("Error syncing user to Supabase:", error);
  }
}

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  if (userId && sessionClaims && (isAuthRoute(req) || isAdminRoute(req))) {
    await syncUserToSupabase(userId).catch(console.error);
  }

  const { role } = (sessionClaims?.metadata as UserMetadata) || { role: "" };

  if (isAdminRoute(req) && role !== "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute(req) && !userId) {
    const url = new URL("/sign-in", req.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
