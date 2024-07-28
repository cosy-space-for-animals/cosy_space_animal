import React, { type ReactNode } from 'react';
import { css, useTheme } from '@emotion/react';

type Props = {
  color: 'red' | 'white' | 'grey' | 'black';
  filled?: boolean;
  label: string;
  disabled?: boolean;
  onClick: () => void;
  renderIcon: ReactNode;
};

const FilledButtonWithIcon = ({
                                color,
                                filled = false,
                                label,
                                disabled,
                                onClick,
                                renderIcon,
                              }: Props) => {
  const theme = useTheme();

  const styles = {
    red: {
      filled: css`
        background: ${theme.colors.primary[500]};
        color: ${theme.colors.grey[0]};

        &:hover {
          background: linear-gradient(0deg, rgba(241, 81, 57, 1), rgba(241, 81, 57, 1)),
          linear-gradient(0deg, rgba(23, 23, 23, 0.1), rgba(23, 23, 23, 0.1));
          background-size: cover;
          background-blend-mode: overlay;
        }

        &:disabled {
          background: ${theme.colors.grey[300]};
          cursor: not-allowed;
        }
      `,
      outlined: css`
        border: 1px solid ${theme.colors.primary[500]};
        color: ${theme.colors.primary[500]};
        background: transparent;

        &:hover {
          background: ${theme.colors.primary[500]}1A;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `,
    },
    white: {
      filled: css`
        background: ${theme.colors.grey[0]};
        color: ${theme.colors.primary[500]};

        &:hover {
          background: ${theme.colors.grey[0]}CC;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `,
      outlined: css`
        border: 1px solid ${theme.colors.grey[0]};
        color: ${theme.colors.grey[0]};
        background: ${theme.colors.grey[0]}1A;

        &:hover {
          background: ${theme.colors.grey[0]}33;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `,
    },
    grey: {
      filled: css`
        background: ${theme.colors.grey[200]};
        color: ${theme.colors.grey[600]};

        &:hover {
          background: linear-gradient(0deg, #E5E5E5, #E5E5E5),
          linear-gradient(0deg, rgba(23, 23, 23, 0.1), rgba(23, 23, 23, 0.1));
          background-size: cover;
          background-blend-mode: overlay;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `,
      outlined: css`
        border: 1px solid ${theme.colors.grey[200]};
        color: ${theme.colors.grey[600]};
        background: transparent;

        &:hover {
          background: ${theme.colors.grey[200]}1A;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `,
    },
    black: {
      filled: css`
        background: ${theme.colors.grey[700]};
        color: ${theme.colors.grey[0]};

        &:hover {
          background: linear-gradient(0deg, #000000, #000000),
          linear-gradient(0deg, rgba(23, 23, 23, 0.1), rgba(23, 23, 23, 0.1));
          background-size: cover;
          background-blend-mode: overlay;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `,
      outlined: css`
        border: 1px solid ${theme.colors.grey[700]};
        color: ${theme.colors.grey[700]};
        background: transparent;

        &:hover {
          background: ${theme.colors.grey[900]}1A;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `,
    }
  };

  return (
    <button
      css={css`
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 8px 20px;
        ${filled ? styles[color].filled : styles[color].outlined}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {renderIcon}
      <span>{label}</span>
    </button>
  );
};

export default FilledButtonWithIcon;
