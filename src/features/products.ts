import { createSlice } from '@reduxjs/toolkit';
import { ProductInitialState } from './types/Products.type';

const initialState: ProductInitialState = {
  id: 'productsList',
  products: [
    {
      id: 1,
      name: 'Classic Eyeglasses',
      price: 49.99,
      description: 'Timeless design with durable frames.',
      image: 'https://picsum.photos/200?random=1',
      category: 'Eyewear',
      quantity: 100,
      rating: 4.5,
      discount: 10,
      gender: 'U',
      brand: 'VisionPro',
      color: 'Black',
      size: 'Medium',
      type: 'Full-Rim',
      material: 'Metal',
      wishlist: ['1']
    },
    {
      id: 2,
      name: 'Sporty Sunglasses',
      price: 79.99,
      description: 'Perfect for outdoor activities with UV protection.',
      image: 'https://picsum.photos/200?random=2',
      category: 'Sunglasses',
      quantity: 50,
      rating: 4.8,
      discount: 15,
      gender: 'M',
      brand: 'SunGuard',
      color: 'Blue',
      size: 'Large',
      type: 'Wrap-Around',
      material: 'Plastic'
    },
    {
      id: 3,
      name: 'Elegant Reading Glasses',
      price: 29.99,
      description: 'Lightweight and comfortable for daily use.',
      image: 'https://picsum.photos/200?random=3',
      category: 'Reading Glasses',
      quantity: 200,
      rating: 4.2,
      discount: 5,
      gender: 'F',
      brand: 'ReadEase',
      color: 'Red',
      size: 'Small',
      type: 'Half-Rim',
      material: 'Titanium'
    }
  ],
  featuredProducts: [
    {
      id: 4,
      name: 'Premium Aviators',
      price: 99.99,
      description: 'Stylish aviators with polarized lenses.',
      image: 'https://picsum.photos/200?random=4',
      category: 'Sunglasses',
      quantity: 30,
      rating: 4.9,
      discount: 20,
      gender: 'U',
      brand: 'SkyView',
      color: 'Gold',
      size: 'Large',
      type: 'Aviator',
      material: 'Metal',
      featured: true,
      offer: true,
      wishlist: ['1']
    },
    {
      id: 5,
      name: 'Trendy Cat-Eye Glasses',
      price: 59.99,
      description: 'Fashion-forward glasses for a bold look.',
      image: 'https://picsum.photos/200?random=5',
      category: 'Eyewear',
      quantity: 80,
      rating: 4.7,
      discount: 10,
      gender: 'F',
      brand: 'StyleVision',
      color: 'Pink',
      size: 'Medium',
      type: 'Cat-Eye',
      material: 'Plastic',
      featured: true,
      offer: false
    },
    {
      id: 6,
      name: 'Trendy Cat-Eye Glasses',
      price: 59.99,
      description: 'Fashion-forward glasses for a bold look.',
      image: 'https://picsum.photos/200?random=5',
      category: 'Eyewear',
      quantity: 80,
      rating: 4.7,
      discount: 10,
      gender: 'F',
      brand: 'StyleVision',
      color: 'Pink',
      size: 'Medium',
      type: 'Cat-Eye',
      material: 'Plastic',
      featured: true,
      offer: false
    }
  ]
};

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {}
});

export const {} = products.actions;
const productReducer = products.reducer;
export default productReducer;
