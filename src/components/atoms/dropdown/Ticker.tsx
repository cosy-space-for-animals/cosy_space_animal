import { css, useTheme } from '@emotion/react';

interface IProps {
  month: number;
  state?: 'enabled' | 'disabled' | 'selected' | 'withYear';
  year?: number;
  type?: 'vertical' | 'horizontal';
}

const Ticker = ({
  month,
  state = 'enabled',
  year,
  type = 'vertical',
}: IProps) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 4px;
      `}
    >
      {type === 'vertical' && state === 'selected' ? (
        <span
          css={css`
            width: 4px;
            height: 4px;
            background: ${theme.colors.primary[500]};
            border-radius: 50%;
          `}
        ></span>
      ) : null}
      <div
        css={css`
          display: flex;
          flex-direction: ${type === 'horizontal'
            ? 'column-reverse'
            : 'column'};
          align-items: ${type === 'horizontal' ? 'center' : 'end'};
          gap: ${type === 'horizontal'
            ? '16px'
            : state === 'withYear'
              ? '4px'
              : 0};
        `}
      >
        <span
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: ${theme.fontWeights.semibold};
            color: ${type === 'horizontal' && state === 'selected'
              ? theme.colors.grey[0]
              : state === 'disabled'
                ? theme.colors.grey[400]
                : 'inherit'};
            width: ${type === 'horizontal' && state === 'selected'
              ? '40px'
              : 'auto'};
            height: ${type === 'horizontal' && state === 'selected'
              ? '40px'
              : 'auto'};
            background: ${type === 'horizontal' && state === 'selected'
              ? theme.colors.primary[500]
              : 'none'};
            border-radius: 50%;
          `}
        >
          {month}월
        </span>
        {state === 'withYear' ? (
          <span
            css={css`
              font-size: ${theme.fontSizes.xs}px;
              color: ${theme.colors.primary[500]};
            `}
          >
            {year}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Ticker;
