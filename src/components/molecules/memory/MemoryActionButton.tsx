import CommentIcon from '@/assets/icon/CommentIcon';
import FilledCommentIcon from '@/assets/icon/FilledCommentIcon';
import FilledFlowerIcon from '@/assets/icon/FilledFlowerIcon';
import FilledLikeIcon from '@/assets/icon/FilledLikeIcon';
import FlowerIcon from '@/assets/icon/FlowerIcon';
import LikeIcon from '@/assets/icon/LikeIcon';
import { css } from '@emotion/react';

interface IProps {
  type: 'flower' | 'like' | 'comment';
  state?: boolean;
  amount: number;
  onClick?: () => void;
}

const MemoryActionButton = ({ type, state, amount, onClick }: IProps) => {
  return (
    <button
      css={css`
        display: flex;
        align-items: center;
        gap: 4px;
      `}
      onClick={onClick}
    >
      {type === 'flower' ? (
        state ? (
          <FilledFlowerIcon />
        ) : (
          <FlowerIcon color={'var(--grey-700)'} />
        )
      ) : type === 'like' ? (
        state ? (
          <FilledLikeIcon />
        ) : (
          <LikeIcon color={'var(--grey-700)'} />
        )
      ) : state ? (
        <FilledCommentIcon />
      ) : (
        <CommentIcon color={'var(--grey-700)'} />
      )}
      <span
        css={css`
          color: ${state ? 'inherit' : 'var(--grey-700)'};
          @media screen and (max-width: 743px) {
            font-size: 13px;
          }
        `}
      >
        {amount}
      </span>
    </button>
  );
};

export default MemoryActionButton;
