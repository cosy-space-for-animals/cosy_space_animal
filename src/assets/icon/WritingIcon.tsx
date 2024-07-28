import { useTheme } from '@emotion/react';

const WritingIcon = ({ color, size = 24 }: IIconProps) => {
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
        d='M3 21H21'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.5 13.5L14.5 3.49998C15.3284 2.67155 16.6716 2.67155 17.5 3.49998C18.3284 4.32841 18.3284 5.67155 17.5 6.49998L7.5 16.5L3.5 17.5L4.5 13.5Z'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default WritingIcon;
