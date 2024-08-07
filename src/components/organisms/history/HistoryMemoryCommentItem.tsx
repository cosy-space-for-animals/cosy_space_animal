import { css, useTheme } from '@emotion/react';
import Image from 'next/image';
import sampleMemoryThumbnail from '@/assets/images/sampleMemoryThumbnail.png';
import IconButton from '@/components/atoms/buttons/IconButton';
import TrashIcon from '@/assets/icon/TrashIcon';

interface IProps {
  thumbImg: string;
  comment: string;
}

const HistoryMemoryCommentItem = ({ thumbImg, comment }: IProps) => {
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
        <Image
          src={sampleMemoryThumbnail}
          alt='썸네일 이미지'
          width={64}
          height={64}
          css={css`
            object-fit: cover;
            border-radius: 6px;
          `}
        />
      </div>
      <p
        css={css`
          font-size: ${theme.fontSizes.sm}px;
        `}
      >
        {comment}
      </p>
      <IconButton>
        <TrashIcon color={theme.colors.grey[400]} />
      </IconButton>
    </div>
  );
};

export default HistoryMemoryCommentItem;
