const ArrowRightIcon = ({
  color = 'var(--grey-900)',
  size = 24,
}: IIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3 12H21M21 12L14 5M21 12L14 19'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export default ArrowRightIcon;
