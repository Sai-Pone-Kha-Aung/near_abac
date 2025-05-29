export type Card = {
  id: number;
  name: string;
  category: string;
  address: string;
  phone: string;
  line_id: string;
  facebook: string;
  instagram: string;
  hours: string;
  image: string;
  google_map_link: string;
};

export type SingleItem = {
  id: number;
  name: string;
  category: string;
  desc: string;
  address: string;
  phone: string;
  line_id: string;
  facebook: string;
  instagram: string;
  hours: string;
  image: string;
  google_map_link: string;
};

export interface sheetsData {
  id: number;
  name: string;
  category: string;
  desc: string;
  address: string;
  phone: string;
  line_id: string;
  facebook: string;
  instagram: string;
  hours: string;
  image: string;
  google_map_link: string;
}

export type CategoryType =
  | "apartment"
  | "condo"
  | "restaurant"
  | "cafe"
  | "bakery"
  | "shopping"
  | "entertainment"
  | "hotel";

export interface Listing {
  id: string;
  user_id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  google_map_link: string;
  line_id: string;
  facebook_url: string;
  instagram_url: string;
  img_url: string;
  distance?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  name: string;
}

export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  code?: string;
  errors?: any[];
}
