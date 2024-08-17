'use client';

import { PropsWithChildren } from 'react';
import { css, useTheme } from '@emotion/react';
import SearchButton from '@/components/atoms/buttons/SearchButton';
import { fetchWrapper } from '@/utils/fetch/fetchWrapper';
import UnauthenticatedHeader from '@/components/molecules/header/UnauthenticatedHeader';
import AuthenticatedEditHeader from '@/components/molecules/header/AuthenticatedEditHeader';
import AuthenticatedDefaultHeader from '@/components/molecules/header/AuthenticatedDefaultHeader';
import { useQuery } from '@tanstack/react-query';

type Props = {
  isLogin: boolean;
  hasBGColor?: boolean;
  type?: 'default' | 'edit';
  mode?: 'default' | 'dark';
  onSubmit?: (e: string) => void;
  onDebounceChange?: (e: string) => void;
}

async function fetchNotifications(petId, currentPage = 1, dataCounts = 10) {
  const url = `/api/notifications?petId=${petId}&currentPage=${currentPage}&dataCounts=${dataCounts}`;

  try {
    return await fetchWrapper(url);
  } catch (error) {
    return error;
  }
}

function HeaderNavigation(
  {
    isLogin,
    hasBGColor = false,
    mode = 'default',
    type = 'default',
    onSubmit,
    onDebounceChange,
  }: PropsWithChildren<Props>) {
  const theme = useTheme();

  // const {data, isSuccess} = useQuery({
  //   queryKey: ['notifications'],
  //   queryFn: async () => {
  //     try {
  //       return await fetchNotifications(2);
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  // })


  return (
    <div
      css={css`
        display: flex;
        color: ${theme.colors.grey[700]};
        gap: 1rem;
        padding: 6px;
        border-radius: 999px;
        background-color: ${hasBGColor ? '#FFFFFFCC' : 'transparent'};
      `}
    >
      {type === 'default' && (
        <SearchButton
          color={mode === 'default' ? 'default' : 'white'}
          onSubmit={(e) => {
            onSubmit && onSubmit(e);
          }}
          onDebounceChange={(e) => {
            onDebounceChange && onDebounceChange(e);
          }}
        />
      )}
      {(isLogin && type !== 'edit') && (
        <AuthenticatedDefaultHeader mode={mode} />
      )}
      {(isLogin && type === 'edit') && (
        <AuthenticatedEditHeader mode={mode} />
      )}
    </div>
  );
}


export default HeaderNavigation;
