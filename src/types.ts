export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  description: string;
  flavor: string[];
  roast: 'Light' | 'Medium' | 'Dark';
  weight: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
