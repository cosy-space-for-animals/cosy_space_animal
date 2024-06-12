import { useTheme } from '@emotion/react';

const DragIcon = ({ color, size = 24 }: IIconProps) => {
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
        d='M15 19L12 22M12 22L9 19M12 22V8.5V2M15 5L12 2M12 2L9 5M5 9L2 12M2 12L5 15M2 12H15.5H22M19 9L22 12M22 12L19 15'
        stroke={color || defaultColor}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export default DragIcon;
