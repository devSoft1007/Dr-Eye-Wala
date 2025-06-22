import React, { FC } from 'react';
import { ShoppingCart as LRShoppingCart, LucideProps } from 'lucide-react';

const ShoppingCart: FC<LucideProps> = ({ ...props }) => {
  return <LRShoppingCart {...props} />;
};

export default ShoppingCart;
