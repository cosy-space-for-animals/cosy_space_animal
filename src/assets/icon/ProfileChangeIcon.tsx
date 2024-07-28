import { useTheme } from '@emotion/react';

const ProfileChangeIcon = ({ color, size = 24 }: IIconProps) => {
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
        cx='11.0002'
        cy='6.88889'
        r='4.13889'
        stroke={color || defaultColor}
        strokeWidth='1.5'
      />
      <path
        d='M19 19.7777V19.7777C19 15.8504 15.8162 12.6666 11.8889 12.6666H10.1111C6.18375 12.6666 3 15.8504 3 19.7777V19.7777'
        stroke={color || defaultColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect x='11' y='11' width='12' height='12' rx='6' fill='#F15139' />
      <path
        d='M20.0719 17.7C19.7536 19.1028 18.4991 20.15 17 20.15C15.5008 20.15 14.2463 19.1028 13.928 17.7M13.928 17.7L13.5 18.75M13.928 17.7L14.9 18.225M13.928 16.3C14.2463 14.8972 15.5008 13.85 17 13.85C18.4991 13.85 19.7536 14.8972 20.0719 16.3M20.0719 16.3L19.1 15.775M20.0719 16.3L20.5 15.25'
        stroke='white'
        strokeWidth='0.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ProfileChangeIcon;
