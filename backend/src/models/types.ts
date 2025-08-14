export interface User {
  id?: number;
  username: string;
  password: string; 
  email: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  status?: number;
}

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id?: number | null;
  status?: number;
  created_at?: string;
  updated_at?: string;
}
