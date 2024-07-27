'use client';

import { PropsWithChildren, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import SearchButton from '@/components/atoms/buttons/SearchButton';

type Props = {
  isLogin: boolean;
  hasBGColor?: boolean;
  type?: 'default' | 'edit';
  mode?: 'default' | 'dark';
  onSubmit?: (e: string) => void;
  onDebounceChange?: (e: string) => void;
}

function HeaderNavigation({
                            isLogin,
                            hasBGColor = false,
                            mode = 'default',
                            type = 'default',
                            onSubmit,
                            onDebounceChange,
                            children,
                          }: PropsWithChildren<Props>) {
  const theme = useTheme();

  console.log(hasBGColor);
  return (
    <div
      css={css`
        display: flex;
        color: ${theme.colors.grey[700]};
        gap: 1rem;
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
      {children}
    </div>
  );
}


export default HeaderNavigation;
