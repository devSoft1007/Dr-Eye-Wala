import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative h-[500px] z-0 bg-[url('https://picsum.photos/1000')] bg-cover bg-center flex items-center justify-center text-white text-center">
      <div className="bg-black bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-4xl font-bold">Discover Your Perfect Pair</h1>
        <p className="mt-2 text-lg">Shop stylish eyeglasses at unbeatable prices</p>
        <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
