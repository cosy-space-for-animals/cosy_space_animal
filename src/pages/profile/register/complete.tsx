import React, { useEffect } from 'react';
import { css, keyframes, useTheme } from '@emotion/react';
import Logo from '@/components/atoms/Logo';
import { useDevice } from '@/context/DeviceContext';
import { useSSRValue } from '@/lib/recoil/useSSR';
import { defaultProfileData, profileDataAtom, profileImageAtom } from '@/recoil/store';
import { useRecoilValue } from 'recoil';
import ImageMask from '@/components/atoms/ImageMask';
import Image from 'next/image';
import frames from '@/constants/frames.json';
import { TFrameShape } from '@/components/organisms/profile/ProfileSettingStep4';
import FavoriteTag, { Color } from '@/components/atoms/FavoriteTag';
import ThemedText from '@/components/atoms/ThemedText';
import MainButton from '@/components/atoms/buttons/MainButton';
import { useRouter } from 'next/router';

const MaskedImage = (
  { file, currenTFrameShape, theme }:
    { file: File, currenTFrameShape: TFrameShape, theme: ReturnType<typeof useTheme> },
) => {

  return (
    <ImageMask
      maskId={'mask'}
      renderedImage={
        <Image
          src={URL.createObjectURL(file)}
          alt="profile image"
          width={frames[currenTFrameShape].width}
          height={frames[currenTFrameShape].height}
          css={css`
            border-radius: 6px;
            object-fit: cover;
            clip-path: url(#mask);
            position: absolute;
          `}
        />
      }
      width={frames[currenTFrameShape].width}
      height={frames[currenTFrameShape].height}
      svgShape={frames[currenTFrameShape].path}
    />
  );
};

const tagPosition = [
  {
    top: '56px',
    left: '0',
  },
  {
    top: '162px',
    right: 0,
  },
  {
    top: '300px',
    left: '80px',
  },
]

const Complete = () => {
  const theme = useTheme();
  const { isMobile } = useDevice();
  const data = useSSRValue(profileDataAtom, defaultProfileData);
  const profileImage = useRecoilValue(profileImageAtom);
  const router = useRouter();

  useEffect(() => {
    console.log(data);
    console.log(profileImage);
  }, [data, profileImage]);

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
        {profileImage && (
          <div css={css`
            position: relative;
            width: 360px;
            height: 360px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}>
            <MaskedImage
              file={profileImage}
              currenTFrameShape={data.petProfileFrame}
              theme={theme}
            />
            <div css={css`
              position: absolute;
              width: 100%;
              height: 100%;
            `}>
              {data.petFavs.map((tag, index) => {
                const [text, color] = tag.split(',');
                return (
                  <div
                    key={index}
                    css={css`
                      position: absolute;
                      width: fit-content;
                      ${{...tagPosition[index]}}
                      animation: ${keyframes`${theme.keyframes.fadeDown}`} 0.4s linear forwards
                    `}>
                    <FavoriteTag
                      isMobile={isMobile}
                      text={text}
                      color={color as Color}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div css={css`
          display: flex;
          flex-direction: column;
          gap: 40px;
        `}>
          <div css={css`
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
          `}>
            <ThemedText type="titleMedium">프로필이 성공적으로 만들어졌어요!</ThemedText>
            <ThemedText type="titleMedium">
            <span css={css`
              color: ${theme.colors.primary[500]};
            `}>첫번째 추억</span>
              을 올려볼까요?
            </ThemedText>
          </div>
          <div css={css`
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          `}>
            <MainButton
              type={'filled'}
              onClick={() => {
                alert('준비 중 입니다!')
              }}
            >
              추억 올리기
            </MainButton>
            <MainButton
              type={'outline'}
              onClick={() => {
                router.push('/');
              }}
              style={css`
                border: none;
                color: ${theme.colors.grey[500]};

                &:hover:enabled {
                  background-color: #ffffff00;
                }
              `}
            >
              홈으로 가기
            </MainButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Complete;
