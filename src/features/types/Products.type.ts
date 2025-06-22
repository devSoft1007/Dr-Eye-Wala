import { BaseInitialState } from './baseFeature.type';

export type ProductInitialState = BaseInitialState & {
  products: BaseProduct[];
  featuredProducts: FeaturedProduct[];
};

export type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
  category?: string;
  quantity?: number;
  rating: number;
  discount: number;
  gender: 'M' | 'F' | 'U';
  brand?: string;
  color: string;
  size: string;
  type?: string;
  material: string;
  wishlist?: string[];
  review?: number;
};

export type FeaturedProduct = BaseProduct & {
  featured: boolean;
  offer: boolean;
};
