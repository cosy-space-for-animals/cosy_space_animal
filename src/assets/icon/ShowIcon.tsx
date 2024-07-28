import { useTheme } from '@emotion/react';

const ShowIcon = ({ color, size = 24 }: IIconProps) => {
  const theme = useTheme();
  const defaultColor = theme.colors.grey[900];
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 12C1 12 5 4 12 4C19 4 23 12 23 12'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 12C1 12 5 20 12 20C19 20 23 12 23 12'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ShowIcon;
