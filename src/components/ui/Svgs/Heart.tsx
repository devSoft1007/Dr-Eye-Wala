import { HeartIcon, LucideProps } from 'lucide-react';
import React, { FC } from 'react';

const Heart: FC<LucideProps> = ({ ...props }) => {
  return <HeartIcon {...props}></HeartIcon>;
};

export default Heart;
