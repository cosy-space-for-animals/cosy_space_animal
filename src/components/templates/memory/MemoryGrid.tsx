'use client';

import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import Masonry from 'react-masonry-css';
import fetchWrapper from '@/utils/fetchWrapper';
import MemoryItem from '@/components/organisms/memory/MemoryItem';

async function fetchMemories() {
  try {
    const res = fetchWrapper('/api/recent-memories?petId=2&currentPage=1&dataCounts=20');

    return res;
  } catch (error) {
    console.error(error);
  }
}

function MemoryGrid() {

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
        {Array.from({ length: 20 }).map((_, i) => (
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
