export type Locale = 'fr' | 'ar';

export type BilingualText = {
  fr: string;
  ar: string;
};

export interface Product {
  _id: string;
  name: BilingualText;
  description: BilingualText;
  slug: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  weight: number;
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  productId: string;
  name: BilingualText;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  stripeSessionId?: string;
  shippingAddress: ShippingAddress;
  createdAt: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}
