import React from 'react';
import { css, useTheme } from '@emotion/react';
import Logo from '@/components/atoms/Logo';
import { useDevice } from '@/context/DeviceContext';

const Complete = () => {
  const theme = useTheme();
  const { isMobile } = useDevice();

  return (
    <div css={css`
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 48px;
      gap: 72px;
      @media ${theme.device.mobile} {
        padding-top: 0;
      }
    `}>
      {!isMobile && (
        <Logo color={'grey'} size={'md'} />
      )}
      <section css={css`
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        width: 100%;
        max-width: 520px;
        @media ${theme.device.mobile} {
          min-width: 0;
          width: 100%;
          padding: 0;
          height: 100%;
        }
      `}>

      </section>
    </div>
  );
};

export default Complete;
