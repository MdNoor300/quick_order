export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category?: string;
  image?: string;
  image_url?: string;
}
