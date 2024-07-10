import React from 'react';
import Image from 'next/image';
import ClipSVG from '@/assets/images/clip.svg';
import { css, useTheme } from '@emotion/react';
import Logo from '@/components/atoms/Logo';
import { useDevice } from '@/context/DeviceContext';
import dynamic from 'next/dynamic';

const PostProfile = dynamic(() => import('@/components/organisms/profile/PostProfile'));

type StepProps = {
  step: string;
};


export async function getServerSideProps({ query }: { query: { step: string } }) {

  return {
    props: {
      step: query.step,
    },
  };
}

const Step = ({ step }: StepProps) => {
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
        gap: 24px;
        padding: 64px 20px 32px 20px;
        border: 1px solid #1717171A;
        border-radius: 16px;
        position: relative;
        box-shadow: 0 2px 0 0 #00000000;
        background: #ffffff;
        align-items: center;
        width: 100%;
        max-width: 520px;
        @media ${theme.device.mobile} {
          min-width: 0;
          width: 100%;
          padding: 0;
          box-shadow: none;
          border: none;
          height: 100%;
        }
      `}>
        {!isMobile && (
          <Image
            src={ClipSVG}
            alt={'clip image'}
            css={css`
              left: 50%;
              transform: translateX(-50%);
              position: absolute;
              top: -36px;
            `}
            priority={true}
          />
        )}
        <PostProfile
          step={parseInt(step)}
        />
      </section>
    </div>
  );
};

export default Step;
