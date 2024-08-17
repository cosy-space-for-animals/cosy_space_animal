'use client';

import React from 'react';
import { css } from '@emotion/react';
import Masonry from 'react-masonry-css';
import MemoryItem from '@/components/organisms/memory/MemoryItem';

type MemoryGridProps = {
  memoryItems: []
}

function MemoryGrid({ memoryItems }: MemoryGridProps) {


  return (
    <div
      css={css`
        width: 1160px;
        margin: 0 auto;
      `}
    >
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        style={{ display: 'flex', margin: '0 auto' }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {memoryItems.map((_, i) => (
          <MemoryItem
            key={i}
            title="제목"
            date="2021-10-10"
            content="내용"
            commentAmount={1}
            thumbImgs={[]}
            flowerAmount={0}
            profileImg={''}
            name={''}
          />
        ))}
      </Masonry>
    </div>
  );
}


export default MemoryGrid;
