import React from 'react';
import { css, useTheme } from '@emotion/react';
import NotificationIcon from '@/assets/icon/NotificationIcon';
import Link from 'next/link';
import ProfileImage from '@/components/atoms/ProfileImage';
import FilledButtonWithIcon from '@/components/atoms/buttons/FilledButtonWithIcon';
import MemoIcon from '@/assets/icon/MemoIcon';

type Props = {
  mode?: 'default' | 'dark';
}

function AuthenticatedDefaultHeader({ mode }: Props) {
  const theme = useTheme();

  return (
    <>
      <button
        css={css`
          width: 40px;
          height: 40px;
          margin: 0 8px;
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
          margin: 0 8px;
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
  );
}


export default AuthenticatedDefaultHeader;
