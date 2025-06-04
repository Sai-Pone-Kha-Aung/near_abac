export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
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
  count: number;
}

export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  code?: string;
  errors?: any[];
}
