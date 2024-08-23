import CloseIcon from '@/assets/icon/CloseIcon';
import { css, useTheme } from '@emotion/react';

interface IProps {
  text: string;
}

const Keyword = ({ text }: IProps) => {
  const theme = useTheme();
  return (
    <button
      css={css`
        width: 79px;
        height: 32px;
        border-radius: 99px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        background: ${theme.colors.grey[100]};
        &:hover {
          background: ${theme.colors.grey[200]};
          & > span {
            color: ${theme.colors.grey[700]};
          }
          & > svg path {
            stroke: ${theme.colors.grey[700]};
          }
        }
      `}
    >
      <span
        css={css`
          font-weight: ${theme.fontWeights.semibold};
          font-size: ${theme.fontSizes.sm}px;
          color: ${theme.colors.grey[500]};
        `}
      >
        {text}
      </span>
      <CloseIcon color={theme.colors.grey[500]} size={16} />
    </button>
  );
};

export default Keyword;
