import React, { FC } from 'react';

const Product: FC<{ params: { id: string } }> = ({ params }) => {
  return <div>Product: ${params?.id}</div>;
};

export default Product;
