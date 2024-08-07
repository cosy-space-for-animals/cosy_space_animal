import React from 'react';
import { IIconProps } from '@/types/common';

const RectangleHorizontalThumb = ({ color = '#B3B3B3' }: IIconProps) => {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.919922" y="0.0800781" width="14.16" height="9.84" fill={color} />
    </svg>

  );
};

export default RectangleHorizontalThumb;
