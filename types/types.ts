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
  title: string;
  type: CategoryType;
  imageUrl: string;
  mapUrl: string;
  description?: string;
  distance?: string;
}
