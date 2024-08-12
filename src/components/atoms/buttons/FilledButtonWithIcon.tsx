import React, { type ReactNode } from 'react';
import { css, useTheme } from '@emotion/react';

type Props = {
  color: 'red' | 'white' | 'grey'
  label: string;
  disabled?: boolean;
  onClick: () => void;
  renderIcon: ReactNode;
}

const FilledButtonWithIcon = (
  {color,
    label,
    disabled,
    onClick,
    renderIcon,
  }: Props) => {
  const theme = useTheme();

  const getStyles = () => {
    switch (color) {
      case 'red':
        return css`
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
        `;
      case 'white':
        return css`
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
        `;
      case 'grey':
        return css`
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
        `;
      default:
        return css`
          background: ${theme.colors.primary[500]};
          color: ${theme.colors.grey[0]};
        `;
    }
  }

  return (
    <button
      css={css`
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 8px 20px;        
        ${getStyles()}
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
