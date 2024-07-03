import Logo from '@/components/atoms/Logo';
import type { ExtractPropertyType } from '@/types/global';
import { css } from '@emotion/react';
import Link from 'next/link';
import ProgressIndicatorDot from '@/components/atoms/ProgressIndicatorDot';
import ProfileImage from '@/components/atoms/ProfileImage';
import { useState } from 'react';
import SignUp from '../templates/users/SignUp';

type PageType =
  | 'profile-edit'
  | 'login'
  | 'logout'
  | 'home-logout'
  | 'home-login';

type HeaderColor = 'default' | 'white';

interface IHeaderProps<T extends PageType> {
  type: T;
  color: T extends 'home-logout' | 'home-login'
    ? Exclude<HeaderColor, 'white'>
    : HeaderColor;
}

type ExtractColorType<T extends PageType> = ExtractPropertyType<
  IHeaderProps<T>,
  'color'
>;

interface StyleProps {
  color1?: string;
  color2?: string;
  backgroundColor?: string;
  border?: string;
}

type StylesType = {
  [K in PageType]: {
    [C in ExtractColorType<K>]: StyleProps;
  };
};

const styles: StylesType = {
  'profile-edit': {
    default: {
      color1: 'var(--grey-500)',
      color2: 'var(--grey-0)',
      backgroundColor: 'var(--main-red-500)',
    },
    white: {
      color1: 'var(--grey-0)',
      color2: 'var(--main-red-500)',
      backgroundColor: 'var(--grey-0)',
    },
  },
  'home-login': {
    default: {
      color1: 'var(--grey-700)',
      color2: 'var(--main-red-500)',
      border: 'none',
      backgroundColor: 'rgba(255,255,255,0.8)',
    },
  },
  login: {
    default: {
      color1: 'var(--grey-700)',
      color2: 'var(--main-red-500)',
      border: 'none',
    },
    white: {
      color1: 'var(--grey-0)',
      color2: 'transparent',
      border: '1px solid var(--grey-0)',
    },
  },

  'home-logout': {
    default: {
      color1: 'var(--grey-700)',
      color2: 'var(--main-red-500)',
      backgroundColor: 'rgba(255,255,255,0.8)',
    },
  },
  logout: {
    default: {
      color1: 'var(--grey-700)',
      color2: 'var(--main-red-500)',
    },
    white: {
      color1: 'var(--grey-0)',
      color2: 'var(--grey-0)',
    },
  },
};

const Header = <T extends PageType>({ type, color }: IHeaderProps<T>) => {
  const isDefault = Boolean(color === 'default');

  return (
    <header
      css={css`
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          max-width: 1160px;
          padding: 0px 10px 0px 16px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        `}
      >
        <Logo size='sm' color={isDefault ? 'grey' : 'white'} />

        {/* right-side */}
        {(type === 'logout' || type === 'home-logout') && (
          <Logout type={type} color={color} />
        )}
        {(type === 'login' || type === 'home-login') && (
          <Login type={type} color={color} />
        )}

        {type === 'profile-edit' && <ProfileEdit type={type} color={color} />}
      </div>
    </header>
  );
};

const ProfileEdit = <T extends PageType>({ type, color }: IHeaderProps<T>) => {
  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
      `}
    >
      <button
        type='button'
        css={css`
          font-weight: 600;
          outline: none;
          padding: 12px 20px;
          border-radius: 999px;
          background: transparent;
          border: 1px solid ${styles[type][color]['color1']};
          color: ${styles[type][color]['color1']};
        `}
      >
        취소
      </button>
      <button
        type='button'
        css={css`
          font-weight: 600;
          border: none;
          outline: none;
          padding: 12px 20px;
          border-radius: 999px;
          color: ${styles[type][color]['color2']};
          background: ${styles[type][color]['backgroundColor']};
        `}
      >
        저장
      </button>
    </div>
  );
};

const Login = <T extends PageType>({ type, color }: IHeaderProps<T>) => {
  return (
    <>
      <div
        css={css`
          font-size: 1rem;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: -0.5px;
          color: ${styles[type][color].color1};
          position: absolute;
          top: 50%;
          left: 48%;
          transform: translate(-50%, -50%);
        `}
      >
        프로필 수정
      </div>
      <div
        css={css([
          css`
            height: 52px;
            font-weight: 600;
            font-size: 1rem;
            line-height: 1rem;
            letter-spacing: -0.25px;
            display: flex;
            align-items: center;
            border-radius: 99px;
            padding: 6px;
            background: ${styles[type][color]?.backgroundColor ||
            'transparent'};
          `,
        ])}
      >
        <div
          css={css`
            width: 56px;
            display: flex;
            justify-content: center;
          `}
        >
          <svg
            width='40'
            height='40'
            viewBox='0 0 40 40'
            fill='none'
            stroke={styles[type][color]['color1']}
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M25 25L30 30M27.5 18.75C27.5 23.5825 23.5825 27.5 18.75 27.5C13.9175 27.5 10 23.5825 10 18.75C10 13.9175 13.9175 10 18.75 10C23.5825 10 27.5 13.9175 27.5 18.75Z'
              stroke='inherit'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div
          css={css`
            width: 56px;
            display: flex;
            justify-content: center;
          `}
        >
          <div
            css={css`
              position: relative;
            `}
          >
            <svg
              width='40'
              height='40'
              viewBox='0 0 40 40'
              fill='none'
              stroke={styles[type][color]['color1']}
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.6 17.458V16.4C13.6 12.8654 16.4654 10 20 10C23.5346 10 26.4 12.8654 26.4 16.4V17.458C26.4 19.7583 27.0649 22.0096 28.3146 23.9409L29 25H11L11.6854 23.9408C12.9351 22.0096 13.6 19.7583 13.6 17.458Z'
                stroke='inherit'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M19 28.8887C19.5344 29.4825 20.4656 29.4825 21 28.8887'
                stroke='inherit'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <ProgressIndicatorDot
              type='primaryPresent'
              top='8px'
              right='4px'
              isMobile
            />
          </div>
        </div>
        <div
          css={css`
            width: 56px;
            display: flex;
            justify-content: center;
            margin-right: 12px;
          `}
        >
          {/* TODO: api 확인 */}
          <ProfileImage url={null} size={40} color={color} />
        </div>
        <Link href='/'>
          <button
            type='button'
            css={css`
              background: ${styles[type][color].color2};
              color: var(--grey-0);
              font-size: 1rem;
              font-weight: 600;
              line-height: 1rem;
              letter-spacing: -0.25px;
              border: ${styles[type][color].border};
              border-radius: 999px;
              padding: 8px 20px;
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9.5 11.5002L17.5 3.50023C18.3284 2.6718 19.6716 2.6718 20.5 3.50023C21.3284 4.32866 21.3284 5.6718 20.5 6.50023L12.5 14.5002L8 16.0002L9.5 11.5002Z'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            추억 올리기
          </button>
        </Link>
      </div>
    </>
  );
};

const Logout = <T extends PageType>({ type, color }: IHeaderProps<T>) => {
  const [signUpModal, setSignUpModal] = useState(false);

  return (
    <div
      css={css([
        css`
          height: 52px;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1rem;
          letter-spacing: -0.25px;
          display: flex;
          align-items: center;
          border-radius: 99px;
          padding: 6px;
          background: ${styles[type][color]?.backgroundColor || 'transparent'};
        `,
      ])}
    >
      <div
        css={css`
          width: 56px;
          display: flex;
          justify-content: center;
        `}
      >
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          stroke={styles[type][color]['color1']}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M25 25L30 30M27.5 18.75C27.5 23.5825 23.5825 27.5 18.75 27.5C13.9175 27.5 10 23.5825 10 18.75C10 13.9175 13.9175 10 18.75 10C23.5825 10 27.5 13.9175 27.5 18.75Z'
            stroke='inherit'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      <Link
        href='/'
        css={css`
          color: ${styles[type][color]['color1']};
          padding: 12px 20px;
        `}
      >
        로그인
      </Link>
      <div
        /* href='/' */
        css={css(css`
          color: ${styles[type][color]['color2']};
          padding: 12px 20px;
          cursor: pointer;
        `)}
        onClick={() => setSignUpModal((prev) => !prev)}
      >
        회원가입
        {signUpModal && <SignUp />}
      </div>
    </div>
  );
};

export default Header;
