import CommentIcon from '@/assets/icon/CommentIcon';
import FilledCommentIcon from '@/assets/icon/FilledCommentIcon';
import FilledFlowerIcon from '@/assets/icon/FilledFlowerIcon';
import FilledLikeIcon from '@/assets/icon/FilledLikeIcon';
import FlowerIcon from '@/assets/icon/FlowerIcon';
import LikeIcon from '@/assets/icon/LikeIcon';
import { css, useTheme } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';

interface IProps {
  type: 'flower' | 'like' | 'comment';
  state?: boolean;
  amount: number;
}

const MemoryThumbIcon = ({ type, state = false, amount }: IProps) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 2px;
      `}
    >
      <span css={css`
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      `}>
        {type === 'flower' && (
          state ? (
            <FilledFlowerIcon size={14} />
          ) : (
            <FlowerIcon color={theme.colors.grey[500]} size={14} />
          )
        )}
        {type === 'like' && (
          state ? (
            <FilledLikeIcon size={14} />
          ) : (
            <LikeIcon color={theme.colors.grey[500]} size={14} />
          )
        )}
        {type === 'comment' && (
          state ? (
            <FilledCommentIcon size={14} />
          ) : (
            <CommentIcon color={theme.colors.grey[500]} size={14} />
          )
        )}
      </span>
      <ThemedText
        type={'captionMedium'}
        css={css`
          color: ${theme.colors.grey[500]};
        `}
      >
        {amount}
      </ThemedText>
    </div>
  );
};

export default MemoryThumbIcon;
