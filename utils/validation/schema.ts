import { z } from "zod";

export const PaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 12)),
  search: z.string().optional(),
});

export const IdParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export const CreateListingSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be less than 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  address: z
    .string()
    .max(255, "Address must be less than 255 characters")
    .optional(),
  phone: z.string().max(20, "Phone must be less than 20 characters").optional(),
  line_id: z
    .string()
    .max(100, "Line ID must be less than 100 characters")
    .optional(),
  facebook_url: z
    .string()
    .url("Facebook URL must be valid")
    .max(255, "Facebook URL must be less than 255 characters")
    .optional(),
  instagram_url: z
    .string()
    .url("Instagram URL must be valid")
    .max(255, "Instagram URL must be less than 255 characters")
    .optional(),
  google_map_link: z.string().url("Google Map link must be valid").optional(),
  img_url: z
    .string()
    .url("Image URL must be valid")
    .max(500, "Image URL must be less than 500 characters")
    .optional(),
  distance: z
    .string()
    .max(20, "Distance must be less than 20 characters")
    .optional(),
});

export const UpdateListingSchema = CreateListingSchema.partial();

export const ListingQuerySchema = z.object({
  id: z.string().optional(),
  category: z.string().optional(),
  search: z.string().optional(),
  distance: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 12)),
  fetchAll: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});

export const CategoryQuerySchema = z.object({
  category: z.string().optional(),
});

export const UserUpdateSchema = z.object({
  first_name: z.string().max(100).optional(),
  last_name: z.string().max(100).optional(),
  role: z.enum(["admin", "moderator", "user"]).optional(),
});

export const CreateReviewSchema = z.object({
  listing_id: z.string().min(1, "Listing ID is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .max(500, "Comment must be less than 500 characters")
    .optional(),
});

export const CategoryCount = z.object({
  name: z.string(),
  count: z.number().int().nonnegative(),
});

export const UpdateReviewSchema = CreateReviewSchema.partial().omit({
  listing_id: true,
});
