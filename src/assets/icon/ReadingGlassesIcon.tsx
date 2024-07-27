import React from 'react';
import { TColor } from '@/types/theme';

type Props = {
  stroke?: TColor;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'inherit' | 'butt' | 'square';
  strokeLinejoin?: 'round' | 'inherit' | 'miter' | 'bevel';
}

function ReadingGlassesIcon({ stroke = '#000', strokeWidth = 1.5, strokeLinecap = 'round', strokeLinejoin = 'round' }: Props) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 16L21 21M18.5 9.75C18.5 14.5825 14.5825 18.5 9.75 18.5C4.91751 18.5 1 14.5825 1 9.75C1 4.91751 4.91751 1 9.75 1C14.5825 1 18.5 4.91751 18.5 9.75Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>

  )
}


export default ReadingGlassesIcon;
