import React from 'react';
import { IIconProps } from '@/types/common';

const CloverThumb = ({ color }: IIconProps) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.99991 0.160156C5.1111 0.160156 3.57991 1.69134 3.57991 3.58016C1.6911 3.58016 0.159912 5.11134 0.159912 7.00016C0.159912 8.88897 1.6911 10.4202 3.57991 10.4202C3.57991 12.309 5.1111 13.8402 6.99991 13.8402C8.88873 13.8402 10.4199 12.309 10.4199 10.4202C12.3087 10.4202 13.8399 8.88897 13.8399 7.00016C13.8399 5.11134 12.3087 3.58016 10.4199 3.58016C10.4199 1.69134 8.88873 0.160156 6.99991 0.160156Z"
        fill={color} />
    </svg>
  );
};

export default CloverThumb;
