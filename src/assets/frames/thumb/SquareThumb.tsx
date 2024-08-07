import React from 'react';
import { IIconProps } from '@/types/common';

const SquareThumb = ({ color = '#B3B3B3' }: IIconProps) => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="12" height="12" fill={color} />
    </svg>
  );
};

export default SquareThumb;
