import TrashIcon from '@/assets/icon/TrashIcon';
import sampleMemoryThumbnail from '@/assets/images/sampleMemoryThumbnail.png';
import IconButton from '@/components/atoms/buttons/IconButton';
import { css, useTheme } from '@emotion/react';
import Image from 'next/image';

interface IProps {
  profileImg: string;
  name: string;
  comment: string;
}

const HistoryCommentItem = ({ profileImg, name, comment }: IProps) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        border-radius: 8px;
        border: 1px solid ${theme.colors.grey[700]};
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        background: ${theme.colors.grey[50]};
      `}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <Image
          src={sampleMemoryThumbnail}
          alt='프로필 이미지'
          width={32}
          height={32}
          css={css`
            border-radius: 50%;
            border: 0.5px solid ${theme.colors.grey[900]};
            object-fit: cover;
          `}
        />
      </div>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}
      >
        <div
          css={css`
            font-weight: ${theme.fontWeights.medium};
            font-size: ${theme.fontSizes.xs}px;
          `}
        >
          <span
            css={css`
              color: ${theme.colors.grey[500]};
            `}
          >
            {name}
          </span>
          <span>에게</span>
        </div>
        <p
          css={css`
            font-size: ${theme.fontSizes.sm}px;
          `}
        >
          {comment}
        </p>
      </div>
      <IconButton>
        <TrashIcon color={theme.colors.grey[400]} />
      </IconButton>
    </div>
  );
};

export default HistoryCommentItem;
