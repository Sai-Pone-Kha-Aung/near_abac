import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

export interface SyncOptions {
  forceUpdate?: boolean;
  createIfNotExists?: boolean;
}

export async function syncUserToSupabase(options: SyncOptions = {}) {
  const { forceUpdate = false, createIfNotExists = true } = options;

  const user = await currentUser();

  if (!user) {
    throw new Error("No authenticated user found");
  }

  const supabase = await createClient();

  try {
    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    const userData = {
      clerk_id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      first_name: user.firstName,
      last_name: user.lastName,
      image_url: user.imageUrl,
      updated_at: new Date().toISOString(),
    };

    if (existingUser) {
      // User exists - update if needed or forced
      if (forceUpdate || hasUserDataChanged(existingUser, userData)) {
        const { data, error } = await supabase
          .from("users")
          .update(userData)
          .eq("clerk_id", user.id)
          .select();

        if (error) throw error;
        return { user: data[0], action: "updated" };
      } else {
        return { user: existingUser, action: "no_change" };
      }
    } else {
      // User doesn't exist
      if (!createIfNotExists) {
        throw new Error("User not found in Supabase and creation is disabled");
      }

      const { data, error } = await supabase
        .from("users")
        .insert({
          ...userData,
          created_at: new Date().toISOString(),
        })
        .select();

      if (error) throw error;
      return { user: data[0], action: "created" };
    }
  } catch (error) {
    console.error("Error syncing user to Supabase:", error);
    throw error;
  }
}

// Helper function to check if user data has changed
function hasUserDataChanged(existingUser: any, newUserData: any): boolean {
  return (
    existingUser.email !== newUserData.email ||
    existingUser.first_name !== newUserData.first_name ||
    existingUser.last_name !== newUserData.last_name ||
    existingUser.image_url !== newUserData.image_url
  );
}

// Utility to get user from Supabase by Clerk ID
export async function getUserFromSupabase(clerkId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data;
}

// Utility to delete user from Supabase
export async function deleteUserFromSupabase(clerkId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("clerk_id", clerkId)
    .select();

  if (error) throw error;
  return data[0];
}
