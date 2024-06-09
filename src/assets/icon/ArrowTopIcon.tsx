import common from '@/styles/common';

const ArrowTopIcon = ({
  color = common.colors.gray[900],
  size = 24,
}: IconPropsType) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.63623 18.364L18.3642 5.63599M18.3642 5.63599L8.46464 5.636M18.3642 5.63599V15.5355'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export default ArrowTopIcon;
