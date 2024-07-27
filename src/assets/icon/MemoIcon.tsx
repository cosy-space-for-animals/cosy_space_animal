import React from 'react';
import { useTheme } from '@emotion/react';

interface Props extends IIconProps {
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'square' | 'butt';
  strokeLinejoin?: 'round' | 'bevel' | 'miter';
}

function MemoIcon({ color, size = 24, strokeWidth, strokeLinecap, strokeLinejoin }: Props) {
  const theme = useTheme();
  const defaultColor = theme.colors.grey[900];

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13"
        stroke={color || defaultColor}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <path
        d="M9.5 11.5002L17.5 3.50023C18.3284 2.6718 19.6716 2.6718 20.5 3.50023C21.3284 4.32866 21.3284 5.6718 20.5 6.50023L12.5 14.5002L8 16.0002L9.5 11.5002Z"
        stroke={color || defaultColor}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>

  )
}


export default MemoIcon;
