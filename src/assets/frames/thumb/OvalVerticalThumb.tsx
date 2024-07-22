import React from 'react';
import { IIconProps } from '@/types/common';

const OvalVerticalThumb = ({ color = "#F15139" }: IIconProps) => {
  return (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="6.0001" cy="8" rx="5.4" ry="7.5" fill={color} />
    </svg>

  );
};

export default OvalVerticalThumb;
