import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';

function UnauthenticatedHeader() {
  return (
    <>
      <Link
        href="/"
        css={css`
          padding: 4px 20px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          &:-webkit-any-link {
            color: inherit;
          }
        `}
      >
        로그인
      </Link>
      <Link
        href="/"
      >
        회원가입
      </Link>
    </>
  );
}


export default UnauthenticatedHeader;
