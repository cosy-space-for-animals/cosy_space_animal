import { SerializedStyles, css, useTheme } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';

type Type =
  | 'borderlessGrey'
  | 'borderlessRed'
  | 'outline'
  | 'filledRed'
  | 'filledWhite'
  | 'filledGrey';

interface IArrowButtonProps {
  type: Type;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const styles: { [key in Type]: SerializedStyles } = {
  borderlessGrey: css`
    color: var(--grey-700);
    background: transparent;
    &:hover:enabled {
      background: #1717170d;
    }
    &:disabled {
      opacity: 30%;
    }
  `,
  borderlessRed: css`
    color: var(--main-red-500);
    background: transparent;
    &:hover:enabled {
      background: #f151391a;
    }
    &:disabled {
      color: var(--grey-700);
      opacity: 30%;
    }
  `,
  outline: css`
    color: var(--grey-700);
    border: 1px solid var(--grey-700);
    background: transparent;
    &:hover:enabled {
      background: #1717170d;
    }
  `,
  filledRed: css`
    background: var(--main-red-500);
    color: var(--grey-0);
    &:hover:enabled {
      filter: brightness(90%);
    }
    &:disabled {
      background: var(--grey-300);
    }
  `,
  filledWhite: css`
    color: var(--grey-0);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--grey-0);
    &:hover:enabled {
      background: rgba(255, 255, 255, 0.2);
    }
    &:disabled {
      opacity: 50%;
    }
  `,
  filledGrey: css`
    background: var(--grey-200);
    color: var(--grey-600);
    &:hover:enabled {
      filter: brightness(90%);
    }
    &:disabled {
      opacity: 50%;
    }
  `,
};

export default function ArrowButton({
  type = 'borderlessGrey',
  disabled = false,
  onClick,
  children,
}: IArrowButtonProps) {
  const theme = useTheme();

  return (
    <button
      disabled={disabled}
      css={css(
        css`
          height: 40px;
          padding: 4px 20px;
          border-radius: 999px;
          border: none;
          outline: none;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1rem;
          letter-spacing: -0.25px;
          display: flex;
          gap: 8px;
          align-items: center;
        `,
        styles[type],
      )}
      onClick={onClick}
    >
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3 12H21M21 12L14 5M21 12L14 19'
          stroke='inherit'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <ThemedText type={'buttonMedium'}>
        {children}
      </ThemedText>
    </button>
  );
}
