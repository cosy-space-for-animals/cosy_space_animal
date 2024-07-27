import { useTheme } from '@emotion/react';

interface Props extends IIconProps {
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'square' | 'butt';
  strokeLinejoin?: 'round' | 'bevel' | 'miter';
}

const ShareIcon = ({ color, size = 24, strokeWidth, strokeLinecap, strokeLinejoin }: Props) => {
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
        d='M13.9287 8.21467V3.92896L20.9998 11L13.9287 18.0711V13.2392M13.9287 8.22303C13.2855 8.07707 12.6161 8.00002 11.9287 8.00002C6.95815 8.00002 2.92871 12.0295 2.92871 17C2.92871 17.8675 3.05144 18.7063 3.28048 19.5C4.36383 15.7457 7.82562 13 11.9287 13C12.6161 13 13.2855 13.0771 13.9287 13.223'
        stroke={color || defaultColor}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
};

export default ShareIcon;
