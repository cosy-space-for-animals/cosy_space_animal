import Timeline from '@/components/atoms/dropdown/Timeline';
import MemoryItem from '@/components/organisms/memory/MemoryItem';
import MemoryMonthList from '@/components/organisms/memory/MemoryMonthList';
import { css, useTheme } from '@emotion/react';

const MemoryArea = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        padding: 0 16px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 8px;
            font-weight: ${theme.fontWeights.bold};
            font-size: ${theme.fontSizes['2xl']}px;
          `}
        >
          <span>모든 추억</span>
          <span
            css={css`
              color: ${theme.colors.primary[500]};
            `}
          >
            115
          </span>
        </div>
        <Timeline color='ivory' selectedYear={2023} />
      </div>
      <div
        css={css`
          position: relative;
        `}
      >
        <ul
          css={css`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          `}
        >
          <MemoryItem
            thumbImgs={['', '', '']}
            date='2023. 05. 24.'
            title='입만 웃는 기묘한 녀석'
            flowerAmount={45}
            commentAmount={8}
          />
          <MemoryItem
            thumbImgs={['', '', '']}
            date='2023. 05. 24.'
            title='입만 웃는 기묘한 녀석'
            flowerAmount={45}
            commentAmount={8}
          />
          <MemoryItem
            thumbImgs={['', '', '']}
            date='2023. 05. 24.'
            title='입만 웃는 기묘한 녀석'
            flowerAmount={45}
            commentAmount={8}
          />
          <MemoryItem
            thumbImgs={['', '', '']}
            date='2023. 05. 24.'
            title='입만 웃는 기묘한 녀석'
            flowerAmount={45}
            commentAmount={8}
          />
          <MemoryItem
            thumbImgs={['', '', '']}
            date='2023. 05. 24.'
            title='입만 웃는 기묘한 녀석'
            flowerAmount={45}
            commentAmount={8}
          />
          <MemoryItem
            thumbImgs={['', '', '']}
            date='2023. 05. 24.'
            title='입만 웃는 기묘한 녀석'
            flowerAmount={45}
            commentAmount={8}
          />
          <MemoryItem
            thumbImgs={['', '', '']}
            date='2023. 05. 24.'
            title='입만 웃는 기묘한 녀석'
            flowerAmount={45}
            commentAmount={8}
          />
          <MemoryItem
            thumbImgs={['', '', '']}
            date='2023. 05. 24.'
            title='입만 웃는 기묘한 녀석'
            flowerAmount={45}
            commentAmount={8}
          />
        </ul>
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 100%;
          `}
        >
          <MemoryMonthList />
        </div>
      </div>
    </div>
  );
};

export default MemoryArea;
