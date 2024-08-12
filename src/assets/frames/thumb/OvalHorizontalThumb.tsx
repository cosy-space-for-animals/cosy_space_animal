import React from 'react';
import { IIconProps } from '@/types/common';


const OvalHorizontalThumb = ({ color = '#B3B3B3' }: IIconProps) => {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="8" cy="5.99961" rx="7.5" ry="5.4" fill={color} />
    </svg>
  );
};

export default OvalHorizontalThumb;
