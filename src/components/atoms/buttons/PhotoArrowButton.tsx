import { css } from '@emotion/react';

interface IPhotoArrowButtonProps {
  direction: 'left' | 'right';
  onClick?(): void;
}

export default function PhotoArrowButton({
  direction = 'right',
  onClick,
}: IPhotoArrowButtonProps) {
  const isLeft = Boolean(direction === 'left');

  return (
    <button
      css={css`
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: ${isLeft ? 'rotateY(180deg)' : 'rotate(0)'};
      `}
      onClick={onClick}
    >
      <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='4.25'
          y='4.25'
          width='23.5'
          height='23.5'
          rx='11.75'
          stroke='white'
          strokeOpacity='0.6'
          strokeWidth='0.5'
        />
        <g filter='url(#filter0_d_667_262)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28ZM15.5303 11.4697C15.2374 11.1768 14.7626 11.1768 14.4697 11.4697C14.1768 11.7626 14.1768 12.2374 14.4697 12.5303L17.9393 16L14.4697 19.4697C14.1768 19.7626 14.1768 20.2374 14.4697 20.5303C14.7626 20.8232 15.2374 20.8232 15.5303 20.5303L19.5303 16.5303C19.8232 16.2374 19.8232 15.7626 19.5303 15.4697L15.5303 11.4697Z'
            fill='white'
            fillOpacity='0.5'
            shapeRendering='crispEdges'
          />
        </g>
        <defs>
          <filter
            id='filter0_d_667_262'
            x='0'
            y='0'
            width='32'
            height='32'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_667_262'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_667_262'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    </button>
  );
}
