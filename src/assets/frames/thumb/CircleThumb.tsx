import React from 'react';
import { IIconProps } from '@/types/common';

const CircleThumb = ({ color = '#B3B3B3' }: IIconProps) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.9999" cy="7.00039" r="6.6" fill={color} />
    </svg>

  );
};

export default CircleThumb;
