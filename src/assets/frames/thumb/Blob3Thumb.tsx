import React from 'react';
import { IIconProps } from '@/types/common';

const Blob3Thumb = ({ color }: IIconProps) => {
  return (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M5.87241 0.500144C7.56233 0.481105 8.61643 2.36038 9.71586 3.74952C10.6947 4.98631 11.6144 6.28615 11.7364 7.90928C11.8689 9.67302 11.4466 11.4493 10.3965 12.8057C9.24888 14.288 7.65111 15.6675 5.87241 15.4834C4.16157 15.3064 3.21546 13.4002 2.13789 11.9511C1.22775 10.7272 0.245776 9.48035 0.240016 7.90928C0.234239 6.33326 1.18295 5.05229 2.10814 3.83523C3.17917 2.42635 4.18677 0.519134 5.87241 0.500144Z"
            fill={color} />
    </svg>
  );
};

export default Blob3Thumb;
