import { css } from '@emotion/react';
import Image from 'next/image';

interface IProfileLikeButtonProps {
  type: 'like' | 'flower';
  number: number;
  checked?: boolean;
  color?: 'white' | 'default';
  isMobile?: boolean;
}

const ProfileLikeButton: React.FC<IProfileLikeButtonProps> = ({
  type = 'like',
  number,
  checked = false,
  color = 'default',
  isMobile = false,
}) => {
  return (
    <button
      css={css`
        outline: none;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: ${isMobile ? '6px 16px' : '8px 24px'};
        border-radius: 999px;
        border: 1px solid
          ${color === 'default' ? 'var(--grey-900)' : 'var(--grey-0)'};
        &:hover {
          background: ${color === 'default' ? 'transparent' : '#ffffff33'};
        }
      `}
    >
      {color === 'white' && type === 'like' && (
        <Image
          src={checked ? '/icon-heart-checked.svg' : '/icon-heart.svg'}
          alt='like-icon'
          width={24}
          height={24}
        />
      )}
      {color === 'white' && type === 'flower' && (
        <Image
          src={checked ? '/icon-flower-checked.svg' : '/icon-flower.svg'}
          alt='flower-icon'
          width={24}
          height={24}
        />
      )}
      {color === 'default' && type === 'like' && (
        <Image
          src={
            checked ? '/icon-heart-color-checked.svg' : '/icon-heart-color.svg'
          }
          alt='like-icon'
          width={24}
          height={24}
        />
      )}
      {color === 'default' && type === 'flower' && (
        <Image
          src={
            checked
              ? '/icon-flower-color-checked.svg'
              : '/icon-flower-color.svg'
          }
          alt='flower-icon'
          width={24}
          height={24}
        />
      )}

      <span
        css={css`
          font-size: ${isMobile ? '14px' : '1rem'};
          font-weight: ${checked ? 600 : 500};
          line-height: 1rem;
          letter-spacing: -0.25px;
          color: ${color === 'default' ? 'var(--grey-900)' : 'var(--grey-0)'};
        `}
      >
        {number}
      </span>
    </button>
  );
};

export default ProfileLikeButton;
