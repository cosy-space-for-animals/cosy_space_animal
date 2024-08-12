import { SerializedStyles, css } from '@emotion/react';

type Type = 'filled' | 'outline';

interface IMainButtonProps {
  type?: Type;
  disabled?: boolean;
  children: React.ReactNode;
  style?: SerializedStyles;
  onClick?: () => void | Promise<void>;
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
    border: 1px solid var(--main-red-500);
    color: var(--main-red-500);

    &:hover:enabled {
      background: #f151391a;
    }

    &:disabled {
      color: var(--grey-400);
      border: 1px solid var(--grey-200);
    }
  `,
};

export default function MainButton(
  {
    type = 'filled',
    disabled = false,
    children,
    onClick,
    style,
  }: IMainButtonProps) {
  return (
    <button
      disabled={disabled}
      css={css(
        css`
          width: 100%;
          height: 52px;
          border-radius: 8px;
          outline: none;
          border: none;
          line-height: 1rem;
          letter-spacing: -0.25px;
          font-weight: 600;
          font-size: 1rem;
          &:disabled {
            cursor: default;
          }
        `,
        styles[type],
        style,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
