import { useTheme } from '@emotion/react';

const UserIcon = ({ color, size = 24 }: IIconProps) => {
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
      <circle
        cx='12'
        cy='7.5'
        r='4.75'
        stroke={color || defaultColor}
        strokeWidth='1.5'
      />
      <path
        d='M21 22V22C21 17.5817 17.4183 14 13 14H11C6.58172 14 3 17.5817 3 22V22'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default UserIcon;
