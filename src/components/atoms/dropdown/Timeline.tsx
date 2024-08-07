import ArrowDropdownIcon from '@/assets/icon/ArrowDropdownIcon';
import ArrowDropdownUpIcon from '@/assets/icon/ArrowDropdownUpIcon';
import { css, useTheme } from '@emotion/react';
import YearItem from './YearItem';
import { useState } from 'react';

interface IProps {
  color?: 'white' | 'ivory';
  selectedYear: number;
}

const Timeline = ({ color = 'white', selectedYear }: IProps) => {
  const theme = useTheme();

  const currentYear = new Date().getFullYear();
  // 현재 년도를 기준으로 8개의 년도 전까지
  const yearList = Array(8)
    .fill(currentYear)
    .map((v, i) => v - i);

  const [isOpenYearList, setIsOpenYearList] = useState(false);

  const handleToggleOpenYearList = () => {
    setIsOpenYearList(!isOpenYearList);
  };

  return (
    <div
      css={css`
        width: 120px;
      `}
    >
      <button
        onClick={handleToggleOpenYearList}
        css={css`
          width: 100%;
          padding: 8px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <span
          css={css`
            font-weight: ${theme.fontWeights.bold};
            font-size: ${theme.fontSizes.xl}px;
          `}
        >
          {selectedYear}
        </span>
        {isOpenYearList ? <ArrowDropdownUpIcon /> : <ArrowDropdownIcon />}
      </button>
      {isOpenYearList ? (
        <ul
          css={css`
            padding: 16px 12px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background-color: ${color === 'white' ? '#FFFFFFF2' : '#F7F5F1F2'};
            border: ${color === 'white'
              ? 'none'
              : `1px solid ${theme.colors.grey[700]}`};
          `}
        >
          {yearList.map((v) => (
            <li key={v}>
              <button>
                <YearItem
                  year={v}
                  state={v === selectedYear ? 'selected' : 'enabled'}
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Timeline;
