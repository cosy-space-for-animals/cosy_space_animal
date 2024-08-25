import CommentIcon from '@/assets/icon/CommentIcon';
import FilledCommentIcon from '@/assets/icon/FilledCommentIcon';
import FilledFlowerIcon from '@/assets/icon/FilledFlowerIcon';
import FilledLikeIcon from '@/assets/icon/FilledLikeIcon';
import FlowerIcon from '@/assets/icon/FlowerIcon';
import LikeIcon from '@/assets/icon/LikeIcon';
import { css, useTheme } from '@emotion/react';

interface IProps {
  type: 'flower' | 'like' | 'comment';
  state?: boolean;
  amount: number;
}

const MemoryThumbIcon = ({ type, state, amount }: IProps) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 2px;
      `}
    >
      {type === 'flower' ? (
        state ? (
          <FilledFlowerIcon size={14} />
        ) : (
          <FlowerIcon color={theme.colors.grey[500]} size={14} />
        )
      ) : type === 'like' ? (
        state ? (
          <FilledLikeIcon size={14} />
        ) : (
          <LikeIcon color={theme.colors.grey[500]} size={14} />
        )
      ) : state ? (
        <FilledCommentIcon size={14} />
      ) : (
        <CommentIcon color={theme.colors.grey[500]} size={14} />
      )}
      <span
        css={css`
          font-size: ${theme.fontSizes.xs}px;
          color: ${theme.colors.grey[500]};
        `}
      >
        {amount}
      </span>
    </div>
  );
};

export default MemoryThumbIcon;
