import { SerializedStyles, css } from '@emotion/react';

type Type = 'filled' | 'outline' | 'white' | 'outline_white' | 'filled_white' | 'default';

interface IRoundButtonProps {
  type: Type;
  disabled?: boolean;
  onClick: Function;
  children: React.ReactNode;
}

const styles: { [key in Type]: SerializedStyles } = {
  filled: css`
    background: var(--main-red-500);
    color: var(--grey-0);
    &:hover:enabled {
      filter: brightness(90%);
    }
    &:disabled {
      background: var(--grey-300);
    }
  `,
  outline: css`
    background: transparent;
    color: var(--grey-700);
    border: 1px solid var(--grey-400);
    &:hover:enabled {
      background: rgba(23, 23, 23, 0.05);
    }
    &:disabled {
      color: var(--grey-400);
      border: 1px solid var(--grey-200);
    }
  `,
  white: css`
    color: var(--grey-0);
    border: 1px solid var(--grey-0);
    background: rgba(255, 255, 255, 0.1);
    &:hover:enabled {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid var(--grey-0);
      color: var(--grey-0);
    }
    &:disabled {
      opacity: 50%;
    }
  `,
  outline_white: css`
    color: var(--grey-0);
    border: 1px solid var(--grey-0);
    &:hover:enabled {
      background: rgba(255, 255, 255, 0.1);
    }
    &:disabled {
      color: var(--grey-400);
      border: 1px solid var(--grey-200);
    }
  `,
  filled_white: css`
    background: var(--grey-0);
    color: var(--main-red-500);
    &:hover:enabled {
      filter: brightness(90%);
    }
  `,
  default: css`
    background: var(--grey-200);
    color: var(--grey-700);
    &:hover:enabled {
      filter: brightness(90%);
    }
  `,
};

export default function RoundButton({
  type = 'default',
  disabled = false,
  onClick,
  children,
}: IRoundButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      disabled={disabled}
      css={css(
        css`
          padding: 5.5px 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: -0.25px;
          text-align: center;
          border: none;
          outline: none;
          &:disabled {
            cursor: default;
          }
        `,
        styles[type],
      )}
    >
      {children}
    </button>
  );
}
