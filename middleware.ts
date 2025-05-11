import { useAuth } from "@clerk/nextjs";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAuthRoute = createRouteMatcher(["/profile(.*)"]);

type UserMetadata = {
  role: string;
};

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();

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
