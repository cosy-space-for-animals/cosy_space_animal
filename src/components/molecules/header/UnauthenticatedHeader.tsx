import React, { useState } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import SignUpModal from '@/components/templates/users/SignUp';
import SignInModal from '@/components/templates/users/SignIn';

const styles = {
  default: {
    color1: 'var(--grey-700)',
    color2: 'var(--main-red-500)',
  },
  white: {
    color1: 'var(--grey-0)',
    color2: 'var(--grey-0)',
  },
};

type Props = {
  color: 'default' | 'white';
};

function UnauthenticatedHeader({ color }: Props) {
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(false);

  return (
    <>
      <div
        css={css`
          width: 56px;
          display: flex;
          justify-content: center;
        `}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke={styles[color]['color1']}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 25L30 30M27.5 18.75C27.5 23.5825 23.5825 27.5 18.75 27.5C13.9175 27.5 10 23.5825 10 18.75C10 13.9175 13.9175 10 18.75 10C23.5825 10 27.5 13.9175 27.5 18.75Z"
            stroke="inherit"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <Link
        href="/"
        css={css`
          color: ${styles[color]['color1']};
          padding: 12px 20px;
        `}
        onClick={() => setSignInModal((prev) => !prev)}
      >
        로그인
      </Link>
      <div
        /* href='/' */
        css={css(css`
          color: ${styles[color]['color2']};
          padding: 12px 20px;
          cursor: pointer;
        `)}
        onClick={() => setSignUpModal((prev) => !prev)}
      >
        회원가입
      </div>
      {signUpModal && <SignUpModal render={setSignUpModal} />}
      {signInModal && <SignInModal render={setSignInModal} />}
    </>
  );
}


export default UnauthenticatedHeader;
