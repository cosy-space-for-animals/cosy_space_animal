import { css, useTheme } from '@emotion/react';
import Image from 'next/image';
import React, { useEffect } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

const NaverLogin: React.FC = () => {
  const theme = useTheme();

  const handleLogin = () => {
    const ele = document.getElementById('naverIdLogin')?.firstChild;
    if (!ele) return;
    const a = ele as HTMLAnchorElement;

    a.click();
  };

  useEffect(() => {
    const { naver } = window;
    if (!naver) return;

    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/user/naver/callback',
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: '40' }, // 로그인 버튼의 스타일
    });

    naverLogin.init();

    // naverLogin.getLoginStatus((status: boolean) => {
    //   if (status) {
    //     console.log(naverLogin.user);
    //   }
    // });
  }, []);

  return (
    <>
      <div
        id='naverIdLogin'
        css={css`
          display: none;
        `}
      />
      <div
        onClick={handleLogin}
        css={css`
          border-radius: 8px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #03c75a;
          font-size: 16px;
          font-weight: 600;
          line-height: 1em;
          letter-spacing: -0.25px;
          color: ${theme.colors.grey[0]};
        `}
      >
        <Image
          src='/web_light_sq_na.svg'
          width={40}
          height={40}
          alt='naver logo'
        />
        네이버 계정으로 로그인
      </div>
    </>
  );
};

export default NaverLogin;
