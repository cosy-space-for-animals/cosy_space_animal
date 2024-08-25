import Image from 'next/image';
import sampleMemoryThumbnail from '@/assets/images/sampleMemoryThumbnail.png';
import { css, useTheme } from '@emotion/react';
import { toEllipsisStyle } from '../history/UserItem';
import Skeleton from '@/components/atoms/Skeleton';

interface IProps {
  thumbImg: string;
  title: string;
  content: string;
  type?: 'default' | 'skeleton';
}

const SearchMemoryItem = ({
  thumbImg,
  title,
  content,
  type = 'default',
}: IProps) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 8px;
      `}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        {type === 'skeleton' ? (
          <Skeleton type='thumbnail' size={64} />
        ) : (
          <Image
            src={sampleMemoryThumbnail}
            alt='썸네일 이미지'
            width={64}
            height={64}
            css={css`
              border-radius: 6px;
              object-fit: cover;
            `}
          />
        )}
      </div>
      {type === 'skeleton' ? (
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          <Skeleton type='text' size={21} />
          <Skeleton type='text' size={21} />
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            font-size: ${theme.fontSizes.sm}px;
          `}
        >
          <p
            css={css`
              font-weight: ${theme.fontWeights.medium};
              ${toEllipsisStyle(1)}
            `}
          >
            {title}
          </p>
          <p
            css={css`
              ${toEllipsisStyle(2)}
            `}
          >
            {content}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchMemoryItem;
