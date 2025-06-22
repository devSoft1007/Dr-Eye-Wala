import Image from 'next/image';
import React, { FC } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';

import { Button } from '../ui/button';
import ShoppingCart from '../ui/Svgs/ShoppingCart';
import { Card, CardDescription } from '../ui/card';
import Heart from '../ui/Svgs/Heart';
import { ProductCartProps } from './Card.type';

const ProductCard: FC<ProductCartProps> = (props) => {
  const { id, name, image, price, description, size, wishlist, rating, review } = props.product;

  return (
    <Card
      key={id}
      className="bg-white p-4 rounded-lg shadow-md relative justify-between">
      <div className="absolute z-[1] top-6 right-6">
        {wishlist?.includes(props.userId + '') && (
          <FaHeart
            size={22}
            className="text-red-500 hover:border-red-500fill-current"
          />
        )}

        {wishlist?.length === 0 || (!wishlist?.includes(props.userId + '') && <Heart size={22} />)}
      </div>

      <div className="w-full h-[20rem]">
        <Image
          src={image}
          fill
          alt={name}
          className="rounded-md w-full h-full object-cover !relative"
        />
      </div>

      <Card.Title>{name}</Card.Title>

      <Card.Content className="pl-0 flex flex-col gap-2">
        <div className="flex items-center gap-2  w-fit px-2.5 py-1 text-sm bg-blue-50 rounded-3xl">
          <span>{rating}</span>
          <FaStar className="text-sky-600" />
          <span className="text-sky-600 font-bold">344</span>
          {review && <span>344</span>}
        </div>

        <CardDescription>{description}</CardDescription>

        <div>
          <p className="text-sm text-gray-700">
            Size: {size} | {props?.product.brand}
          </p>

          <p className="text-sm text-gray-700 flex items-center">
            <span>${price}</span>
            <span className="line-through text-gray-400 ml-2">${(price * 2.3).toFixed(2)}</span>
            <span className="text-sky-600 ml-2 font-bold"> 20% off</span>
          </p>
        </div>
      </Card.Content>

      <Card.Action>
        <Button className="mt-3 flex items-center">
          <ShoppingCart
            size={18}
            className="mr-2"
          />
          Add to Cart
        </Button>
      </Card.Action>
    </Card>
  );
};

export default ProductCard;
