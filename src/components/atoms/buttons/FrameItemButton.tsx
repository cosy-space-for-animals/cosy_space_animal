import Image from 'next/image';
import type { TProfileShape } from '@/components/atoms/MainUserProfile';
import { css } from '@emotion/react';
import type { Dispatch, SetStateAction } from 'react';

interface IFrameItemButtonProps {
  shape: TProfileShape;
  isSelected?: boolean;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
}

const FrameItemButton: React.FC<IFrameItemButtonProps> = ({
  shape = 'oval1',
  isSelected = false,
  setIsSelected,
}) => {
  function click() {
    setIsSelected((prev) => !prev);
  }

  return (
    <div
      onClick={click}
      css={css`
        > svg {
          * {
            fill: ${isSelected
              ? 'var(--main-red-500)'
              : ' var(--grey-400)'} !important;
            &:hover {
              fill: var(--grey-600) !important;
            }
          }
        }
      `}
    >
      {shape === 'oval1' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <ellipse cx='12.0001' cy='12' rx='5.4' ry='7.5' fill='inherit' />
        </svg>
      )}
      {shape === 'oval2' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <ellipse cx='12' cy='12.0001' rx='7.5' ry='5.4' fill='#B3B3B3' />
        </svg>
      )}
      {shape === 'circle' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='11.9999' cy='11.9999' r='6.6' fill='#B3B3B3' />
        </svg>
      )}
      {shape === 'rectangle1' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            x='7.08008'
            y='4.91992'
            width='9.84'
            height='14.16'
            fill='#B3B3B3'
          />
        </svg>
      )}
      {shape === 'rectangle2' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            x='4.91992'
            y='7.08008'
            width='14.16'
            height='9.84'
            fill='#B3B3B3'
          />
        </svg>
      )}
      {shape === 'square' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect x='6' y='6' width='12' height='12' fill='#B3B3B3' />
        </svg>
      )}
      {shape === 'diamond' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M17.4001 12.0001L12.0001 3.6001L6.6001 12.0001L12.0001 20.4001L17.4001 12.0001Z'
            fill='#B3B3B3'
          />
        </svg>
      )}
      {shape === 'clover' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.9999 5.15991C10.1111 5.15991 8.57991 6.6911 8.57991 8.57991C6.6911 8.57991 5.15991 10.1111 5.15991 11.9999C5.15991 13.8887 6.6911 15.4199 8.57991 15.4199C8.57991 17.3087 10.1111 18.8399 11.9999 18.8399C13.8887 18.8399 15.4199 17.3087 15.4199 15.4199C17.3087 15.4199 18.8399 13.8887 18.8399 11.9999C18.8399 10.1111 17.3087 8.57991 15.4199 8.57991C15.4199 6.6911 13.8887 5.15991 11.9999 5.15991Z'
            fill='#B3B3B3'
          />
        </svg>
      )}
      {shape === 'love' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.6206 17.8405L6.23801 12.3775C4.7219 10.8388 4.81738 8.31574 6.4453 6.89953C8.06031 5.49454 10.5091 5.76737 11.7853 7.49448L11.9999 7.78483L12.2145 7.49448C13.4908 5.76737 15.9395 5.49454 17.5545 6.89953C19.1824 8.31574 19.2779 10.8388 17.7618 12.3775L12.3793 17.8405C12.1697 18.0532 11.8301 18.0532 11.6206 17.8405Z'
            fill='#B3B3B3'
          />
        </svg>
      )}
      {shape === 'blob1' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.1394 5.6313C13.5766 5.82574 14.9816 6.40018 15.9659 7.46113C16.8533 8.4176 16.7538 9.84435 17.1878 11.0728C17.6375 12.3459 18.8551 13.4661 18.552 14.7816C18.2459 16.1104 16.8659 16.8754 15.6902 17.5739C14.606 18.218 13.3996 18.6685 12.1394 18.5913C10.9281 18.5171 9.95395 17.7434 8.8923 17.1576C7.64901 16.4717 5.64437 16.2792 5.41643 14.882C5.17772 13.4188 7.59837 12.7908 7.94469 11.349C8.34848 9.66803 6.4511 7.70793 7.47495 6.31235C8.4253 5.01696 10.5432 5.41534 12.1394 5.6313Z'
            fill='#B3B3B3'
          />
        </svg>
      )}
      {shape === 'blob2' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.6374 7.14704C13.1844 7.11143 14.4832 5.19889 15.9312 5.73445C17.3272 6.25078 17.5596 8.10737 18.0092 9.50372C18.4552 10.8887 19.3163 12.512 18.5048 13.7266C17.6697 14.9766 15.5339 14.2592 14.2726 15.0968C13.0885 15.8831 13.0199 17.9294 11.6374 18.2871C10.2581 18.6439 8.89973 17.6173 7.75424 16.7829C6.61854 15.9556 5.44111 14.9586 5.19214 13.5919C4.95246 12.2764 6.1158 11.1796 6.49985 9.89741C6.90098 8.55818 6.23903 6.59715 7.48744 5.92883C8.78684 5.23319 10.1577 7.1811 11.6374 7.14704Z'
            fill='#B3B3B3'
          />
        </svg>
      )}
      {shape === 'blob3' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.8724 4.50014C13.5623 4.4811 14.6164 6.36038 15.7159 7.74952C16.6947 8.98631 17.6144 10.2862 17.7364 11.9093C17.8689 13.673 17.4466 15.4493 16.3965 16.8057C15.2489 18.288 13.6511 19.6675 11.8724 19.4834C10.1616 19.3064 9.21546 17.4002 8.13789 15.9511C7.22775 14.7272 6.24578 13.4804 6.24002 11.9093C6.23424 10.3333 7.18295 9.05229 8.10814 7.83523C9.17917 6.42635 10.1868 4.51913 11.8724 4.50014Z'
            fill='#B3B3B3'
          />
        </svg>
      )}
      {shape === 'blob4' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.3154 6.24666C12.5206 6.32237 13.3226 7.43148 14.3868 8.00571C15.6941 8.71111 17.4549 8.73324 18.2542 9.99063C19.1077 11.3334 19.421 13.2757 18.6051 14.642C17.7929 16.002 15.8232 15.8708 14.3719 16.4915C13.3322 16.9362 12.4451 17.7485 11.3154 17.7598C10.1793 17.7713 9.21359 17.0971 8.21418 16.5534C7.04039 15.9149 5.39887 15.6046 4.99872 14.3239C4.59831 13.0423 5.82716 11.87 6.36698 10.6413C6.83831 9.56848 7.0781 8.37776 7.95212 7.60155C8.8802 6.77734 10.0799 6.16906 11.3154 6.24666Z'
            fill='#B3B3B3'
          />
        </svg>
      )}
    </div>
  );
};

export default FrameItemButton;
