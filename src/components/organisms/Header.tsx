'use client'

import Logo from '@/components/atoms/Logo';
import { css, useTheme } from '@emotion/react';
import HeaderNavigation from '@/components/molecules/header/HeaderNavigation';

type Props = {
  type?: 'default' | 'edit',
  mode?: 'default' | 'dark',
  hasBG?: boolean,
};

const Header = ({ type = 'default', mode = 'default', hasBG = false }: Props) => {
  const theme = useTheme();
  const isLogin = true;

  return (
    <header
      css={css`
        width: 100%;
        height: 80px;
        position: fixed;
        top: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${mode === 'default' ? theme.colors.grey[700] : theme.colors.grey[0]};
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
        <Logo size="sm" color={mode === 'default' ? 'grey' : 'white'} />

        {type === 'edit' && (
          <h2 css={css`color: ${mode === 'default' ? theme.colors.grey[700] : theme.colors.grey[0]}`}>프로필 수정</h2>)}

        <HeaderNavigation
          isLogin={isLogin}
          mode={mode}
          onSubmit={(e) => {
            console.log(e);
          }}
          onDebounceChange={(e) => {
            console.log(e);
          }}
          hasBGColor={hasBG}
        >

        </HeaderNavigation>
      </div>
    </header>
  );
};


export default Header;
