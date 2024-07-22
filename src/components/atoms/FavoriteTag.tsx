import { css } from '@emotion/react';
import Image from 'next/image';

export type Color = 'sky' | 'yellow' | 'green' | 'pink' | 'purple';

interface IFavoriteTagProps {
  color: Color;
  text: string;
  isMobile?: boolean;
}

const FavoriteTag: React.FC<IFavoriteTagProps> = ({
  color,
  text,
  isMobile = false,
  ...rest
}) => {
  return (
    <div
      css={css`
        background: var(--second-${color});
        padding: 6px 12px;
        width: fit-content;
        max-width: ${isMobile ? '180px' : '200px'};
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: 4px;
        border: 1px solid #171717;
        border-radius: 999px;
      `}
    >
      <Image
        src={'/icon-like-16px.svg'}
        width={16}
        height={16}
        alt='favorite-icon'
      />
      <span
        css={css`
          max-width: ${isMobile ? '138px' : '161px'};
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          word-break: break-all;
          font-weight: 400;
          font-size: ${isMobile ? '14px' : '1rem'};
          line-height: ${isMobile ? '21px' : '24px'};
          letter-spacing: -0.5px;
          color: var(--grey-900);
        `}
      >
        {text}
      </span>
    </div>
  );
};

export default FavoriteTag;
