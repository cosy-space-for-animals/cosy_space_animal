import React from 'react';
import { IIconProps } from '@/types/common';

const RectangleVerticalThumb = ({ color = '#B3B3B3' }: IIconProps) => {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.0800781" y="0.919922" width="9.84" height="14.16" fill={color} />
    </svg>

  );
};

export default RectangleVerticalThumb;
