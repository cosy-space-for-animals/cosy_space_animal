import Logo from '@/components/atoms/Logo';
import { css, useTheme } from '@emotion/react';
import Link from 'next/link';
import HeaderNavigation from '@/components/molecules/header/HeaderNavigation';
import RoundButton from '@/components/atoms/buttons/RoundButton';
import NotificationIcon from '@/assets/icon/NotificationIcon';
import ProfileImage from '@/components/atoms/ProfileImage';
import FilledButtonWithIcon from '@/components/atoms/buttons/FilledButtonWithIcon';
import MemoIcon from '@/assets/icon/MemoIcon';

type Props = {
  type?: 'default' | 'edit',
  mode?: 'default' | 'dark',
};

const Header = ({ type = 'default', mode = 'default' }: Props) => {
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
        >
          {!isLogin && (
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
          )}
          {(isLogin && type !== 'edit') && (
            <>
              <button
                css={css`
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;

                  &:hover {
                    background: rgba(23, 23, 23, 0.05);
                  }

                  transition: all 0.1s;
                `}
              >
                <NotificationIcon
                  stroke={mode === 'default' ? theme.colors.grey[700] : theme.colors.grey[0]}
                />
              </button>
              <Link
                href="/"
                css={css`

                `}
              >
                <ProfileImage
                  url="https://avatars.githubusercontent.com/u/7760?v=4"
                  size={40}
                  color="default"
                />
              </Link>
              <FilledButtonWithIcon
                renderIcon={<MemoIcon color={theme.colors.grey[0]} />}
                filled={mode === 'default'}
                label="추억 올리기"
                color={mode === 'default' ? 'red' : 'white'}
                onClick={() => {
                }}
              />
            </>
          )}
          {(isLogin && type === 'edit') && (
            <>
              <RoundButton
                type={mode === 'default' ? 'outline' : 'outline_white'}
                onClick={() => {
                  console.log('click');
                }}
              >
                취소
              </RoundButton>
              <RoundButton
                type={mode === 'default' ? 'filled' : 'filled_white'}
                onClick={() => {
                  console.log('click');
                }}
              >
                저장
              </RoundButton>
            </>
          )}
        </HeaderNavigation>
      </div>
    </header>
  );
};


export default Header;
