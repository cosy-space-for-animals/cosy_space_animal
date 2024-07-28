import { useTheme } from '@emotion/react';

const ContentsIcon = ({ color, size = 24 }: IIconProps) => {
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
      <rect
        x='3.5'
        y='7.25'
        width='13.5'
        height='13.5'
        rx='2.75'
        stroke={color || defaultColor}
        strokeWidth='1.5'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.7497 3H9.74971C7.98648 3 6.52777 4.30385 6.28516 6H7.81272C8.03474 5.13739 8.81779 4.5 9.74971 4.5H17.7497C18.8543 4.5 19.7497 5.39543 19.7497 6.5V14.5C19.7497 15.4319 19.1123 16.215 18.2497 16.437V17.9646C19.9459 17.7219 21.2497 16.2632 21.2497 14.5V6.5C21.2497 4.567 19.6827 3 17.7497 3Z'
        fill={color || defaultColor}
      />
    </svg>
  );
};

export default ContentsIcon;
