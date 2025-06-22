'use client';

import Link from 'next/link';
import { useAppSelector } from '../../../store';
import ProductCard from '../../Card/ProductCard';

const FeaturedProductCards = () => {
  // const { featuredProducts } = useAppSelector((state) => state.products);
  const featuredProducts = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 100,
      imageUrl: '/images/product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 200,
      imageUrl: '/images/product2.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 300,
      imageUrl: '/images/product3.jpg',
    },
    // Add more products as needed
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {featuredProducts.map((product) => (
        <Link
          key={product.id}
          href={`product/${product.id}`}>
          <ProductCard
            product={product}
            // userId={user.id + ''}
          />
        </Link>
      ))}
    </div>
  );
};

export default FeaturedProductCards;
