import { css, useTheme } from '@emotion/react';

interface IProps {
  actions: { name: string; onClick: () => void }[];
}

const CommentActionButton = ({ actions }: IProps) => {
  const theme = useTheme();
  return (
    <ul
      css={css`
        border-radius: 8px;
        border: 1px solid ${theme.colors.grey[500]};
        padding: 8px 12px;
        display: inline-flex;
        align-items: center;
        gap: 2px;
      `}
    >
      {actions.map((v, idx) => (
        <>
          <li
            key={v.name}
            onClick={v.onClick}
            css={css`
              padding: 2px 8px;
              font-weight: ${theme.fontWeights.medium};
              font-size: ${theme.fontSizes.sm}px;
            `}
          >
            {v.name}
          </li>
          {idx === actions.length - 1 ? null : (
            <li
              css={css`
                width: 1px;
                height: 12px;
                background: ${theme.colors.grey[300]};
              `}
            ></li>
          )}
        </>
      ))}
    </ul>
  );
};

export default CommentActionButton;
