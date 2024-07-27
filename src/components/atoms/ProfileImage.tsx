import { Nullable } from '@/types/global';
import { css } from '@emotion/react';

interface ProfileImageProps {
  url: Nullable<string>;
  size: 16 | 24 | 32 | 40 | 64;
  color: 'white' | 'default';
  useHover?: boolean;
  useActive?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  url,
  size = 40,
  color = 'default',
  useHover = true,
  useActive = false,
}) => {
  const isDefault = Boolean(color === 'default');
  const is40 = Boolean(size === 40);
  return (
    <div
      css={css(
        useHover &&
          css`
            // padding: ${size >= 40 ? (is40 ? '4px' : '8px') : '0px'};
            width: fit-content;
            border-radius: 50%;
            &:hover {
              background: ${isDefault
                ? 'rgba(241, 81, 57, 0.2)'
                : 'rgba(255, 255, 255, 0.2)'};
            }
          `,
        useActive &&
          css`
            // padding: ${size >= 40 ? (is40 ? '4px' : '8px') : '0px'};
            width: fit-content;
            border-radius: 50%;
            background: ${isDefault
              ? 'rgba(241, 81, 57, 0.2)'
              : 'rgba(255, 255, 255, 0.2)'};
          `,
      )}
    >
      <div
        css={css(css`
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: ${isDefault
            ? '1px solid var(--grey-700)'
            : '0.5px solid var(--grey-200)'};
          background: ${url
            ? `url(${url}) no-repeat center/ cover`
            : 'rgba(23, 23, 23, 0.1)'};
        `)}
      >
        {!url && (
          <svg
            width='60%'
            height='60%'
            viewBox='0 0 24 24'
            fill='none'
            stroke={isDefault ? 'var(--grey-700)' : 'var(--grey-0)'}
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='12'
              cy='7.5'
              r='4.75'
              stroke='inherit'
              strokeWidth='1.5'
            />
            <path
              d='M21 22V22C21 17.5817 17.4183 14 13 14H11C6.58172 14 3 17.5817 3 22V22'
              stroke='inherit'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;

{
  /*  */
}
