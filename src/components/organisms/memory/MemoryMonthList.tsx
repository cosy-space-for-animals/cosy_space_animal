import Ticker from '@/components/atoms/dropdown/Ticker';
import { css } from '@emotion/react';

const MemoryMonthList = () => {
  return (
    <div
      css={css`
        position: relative;
        height: 680px;
        overflow-y: auto;
      `}
      className='hide-scrollbar'
    >
      <div
        css={css`
          position: sticky;
          top: 0;
          width: 100%;
          height: 24px;
          background: linear-gradient(
            180deg,
            #f7f5f1 0%,
            rgba(247, 245, 241, 0) 100%
          );
          z-index: 1;
        `}
      ></div>
      <div
        css={css`
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: end;
          gap: 48px;
        `}
      >
        <Ticker month={5} state='selected' />
        <Ticker month={4} state='disabled' />
        <Ticker month={3} />
        <Ticker month={2} />
        <Ticker month={1} state='withYear' year={2023} />
        <Ticker month={12} />
        <Ticker month={11} state='disabled' />
        <Ticker month={10} />
        <Ticker month={9} />
        <Ticker month={8} />
        <Ticker month={7} />
        <Ticker month={6} />
        <Ticker month={5} />
      </div>
      <div
        css={css`
          position: sticky;
          bottom: 0;
          width: 100%;
          height: 24px;
          background: linear-gradient(
            180deg,
            rgba(247, 245, 241, 0) 0%,
            #f7f5f1 100%
          );
          z-index: 1;
        `}
      ></div>
    </div>
  );
};

export default MemoryMonthList;
