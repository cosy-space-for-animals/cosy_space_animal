import React from 'react';
import { IIconProps } from '@/types/common';

const DiamondThumb = ({ color = '#B3B3B3' }: IIconProps) => {
  return (
    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.4001 8.99961L6.0001 0.599609L0.600098 8.99961L6.0001 17.3996L11.4001 8.99961Z" fill={color} />
    </svg>
  );
};

export default DiamondThumb;
