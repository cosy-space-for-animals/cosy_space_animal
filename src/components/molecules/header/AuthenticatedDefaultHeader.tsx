'use client';

import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import NotificationIcon from '@/assets/icon/NotificationIcon';
import ProfileImage from '@/components/atoms/ProfileImage';
import FilledButtonWithIcon from '@/components/atoms/buttons/FilledButtonWithIcon';
import MemoIcon from '@/assets/icon/MemoIcon';
import UserMenu from '@/components/molecules/header/UserMenu';
import { useRouter } from 'next/router';

type Props = {
  mode?: 'default' | 'dark';
}

function AuthenticatedDefaultHeader({ mode }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


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
      <div css={css`
        position: relative;
      `}>
        <button
          css={css`
            margin: 0 8px;
          `}
          onClick={() => {
            setIsUserMenuOpen((prev) => !prev);
          }}
        >
          <ProfileImage
            url="https://avatars.githubusercontent.com/u/7760?v=4"
            size={40}
            color="default"
          />

        </button>
        {isUserMenuOpen && <UserMenu />}
      </div>
      <FilledButtonWithIcon
        renderIcon={<MemoIcon color={theme.colors.grey[0]} />}
        filled={mode === 'default'}
        label="추억 올리기"
        color={mode === 'default' ? 'red' : 'white'}
        onClick={() => {
          router.push('/profile/register');
        }}
      />
    </>
  );
}


export default AuthenticatedDefaultHeader;
