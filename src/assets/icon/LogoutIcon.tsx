import { useTheme } from '@emotion/react';

const LogoutIcon = ({ color, size = 24 }: IIconProps) => {
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
        d='M9 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H9'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M3 12H13M13 12L9.11111 8M13 12L9.11111 16'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default LogoutIcon;
