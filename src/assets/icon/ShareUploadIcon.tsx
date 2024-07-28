import { useTheme } from '@emotion/react';

const ShareUploadIcon = ({ color, size = 24 }: IIconProps) => {
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
        d='M4 13.5V18.75C4 19.7165 4.79594 20.5 5.77778 20.5H18.2222C19.2041 20.5 20 19.7165 20 18.75V13.5'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 15.5V3.5M12 3.5L7.5 8.16668M12 3.5L16.5 8.16666'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ShareUploadIcon;
