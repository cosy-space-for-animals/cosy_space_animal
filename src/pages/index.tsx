import { css } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';
import RollingScrollBanner from '@/components/organisms/RollingScrollBanner';
import MainButton from '@/components/atoms/buttons/MainButton';
import { useDevice } from '@/context/DeviceContext';
import { useRouter } from 'next/router';

export default function Home() {
  const { isMobile } = useDevice();
  const router = useRouter();

  return (
    <>
      {isMobile ? (
        <>
          <section
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 40px;
              padding: 84px 20px 0;
              margin: 0 auto;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 32px;
              `}
            >
              <ThemedText type={'headlineSmall'}>환영합니다</ThemedText>
              <ThemedText
                css={css`
                  text-align: center;
                `}
                type={'bodyMedium'}
              >
                memopet의 소중한 회원이 되어주셔서 감사합니다! <br />
                간단히 프로필을 만들고 반려동물과의 추억을 공유해 보세요
              </ThemedText>
            </div>
          </section>
          <section
            css={css`
              display: flex;
              height: 100%;
            `}
          >
            <RollingScrollBanner
              isMobile={isMobile}
              css={css`
                height: 30dvh;
                margin-top: 64px;
              `}
            />
          </section>
          <div
            css={css`
              position: fixed;
              bottom: 0;
              padding: 40px 20px;
              width: 100%;
            `}
          >
            <MainButton
              type={'filled'}
              onClick={() => {
                router.push('/profile/post');
              }}
              style={css`
                width: 100%;
              `}
            >
              프로필 만들기
            </MainButton>
          </div>
        </>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            height: 100%;
            gap: 120px;
            padding-top: 120px;
          `}
        >
          <section
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 40px;
              margin: 0 auto;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 32px;
              `}
            >
              <ThemedText type={'displaySmall'}>환영합니다.</ThemedText>
              <ThemedText
                css={css`
                  text-align: center;
                `}
                type={'bodyLarge'}
              >
                memopet의 소중한 회원이 되어주셔서 감사합니다! <br />
                간단히 프로필을 만들고 반려동물과의 추억을 공유해 보세요
              </ThemedText>
            </div>
            <MainButton
              type={'filled'}
              onClick={() => {
                router.push('/profile/post');
              }}
              style={css`
                width: 320px;
              `}
            >
              프로필 만들기
            </MainButton>
          </section>
          <section>
            <RollingScrollBanner
              css={css`
                height: 442px;
              `}
            />
          </section>
        </div>
      )}
    </>
  );
}
