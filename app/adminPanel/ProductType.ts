export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  mrp: number; // Added MRP
  tag: string;
  brand: string; // Added Brand
  category: string; // Added Category
  image: string;
  gallery: string[];
  stock: number;
  slug: string;
  rating: number;
  review: number; // Changed from string[] to number
  color: string[];
  size: string[];
}

export interface SanityProduct {
  _id: string;
  _type: string;
  title?: string;
  description?: string;
  price?: number;
  mrp?: number; // Added MRP
  tag?: string;
  brand?: string; // Added Brand
  category?: string; // Added Category
  image?: { asset: { _ref: string } };
  gallery?: { asset: { _ref: string } }[];
  stock?: number;
  slug?: { current: string };
  rating?: number;
  review?: number; // Changed from string[] to number
  color?: string[];
  size?: string[];
}