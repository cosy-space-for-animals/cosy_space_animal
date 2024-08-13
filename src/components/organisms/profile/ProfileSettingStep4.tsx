'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDevice } from '@/context/DeviceContext';
import { css, useTheme } from '@emotion/react';
import CameraIcon from '@/assets/icon/CameraIcon';
import FilledButtonWithIcon from '@/components/atoms/buttons/FilledButtonWithIcon';
import ThemedText from '@/components/atoms/ThemedText';
import ImageMask from '@/components/atoms/ImageMask';
import frames from '@/constants/frames.json';
import PhotoArrowButton from '@/components/atoms/buttons/PhotoArrowButton';
import Thumbs from '@/assets/frames/thumb';
import { fourthStep, profileImageAtom } from '@/recoil/store';
import { Nullable } from '@/types/global';
import { useSSR } from '@/lib/recoil/useSSR';
import { useRecoilState } from 'recoil';

const thumbKeys = Object.keys(Thumbs) as Array<keyof typeof Thumbs>;

export type TFrameShape = keyof typeof frames;

const MaskedImage = (
  { file, currenTFrameShape, theme }:
    { file: Nullable<File>, currenTFrameShape: TFrameShape, theme: ReturnType<typeof useTheme> }
) => {

  return (
    <>
      {file ? (
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
      ) : (
        <div
          css={css`
            width: 250px;
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            border-radius: 6px;
            color: ${theme.colors.grey[500]};
          `}
        >
          {frames[currenTFrameShape].path && (
            <div dangerouslySetInnerHTML={{ __html: frames[currenTFrameShape].path }} />
          )}
          <ThemedText
            type={'labelLarge'}
            css={css`
                position: absolute;
              `}
          >
            사진을 <br />
            등록해 주세요
          </ThemedText>
        </div>
      )}
    </>
  )
}

const ProfileSettingStep4 = () => {
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [param, setParam] = useSSR(fourthStep, {
    petProfileFrame: 'oval_vertical' as TFrameShape,
  });
  const [profileImage, setProfileImage] = useRecoilState(profileImageAtom)
  const inputRef = useRef<HTMLInputElement>(null);
  const framesKeys = Object.keys(frames) as TFrameShape[];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        alert('2MB 이하의 이미지만 업로드 가능합니다.');
        return;
      } else {
        setProfileImage(file);
      }
    }
  };

  const handleCurrenTFrameShape = (direction: 'left' | 'right') => {
    const currentIndex = framesKeys.indexOf(param.petProfileFrame);
    if (direction === 'left') {
      if (currentIndex === 0) {
        setParam({ ...param, petProfileFrame: framesKeys[framesKeys.length - 1] });
      } else {
        setParam({ ...param, petProfileFrame: framesKeys[currentIndex - 1] });
      }
    } else {
      if (currentIndex === framesKeys.length - 1) {
        setParam({ ...param, petProfileFrame: framesKeys[0] });
      } else {
        setParam({ ...param, petProfileFrame: framesKeys[currentIndex + 1] });
      }
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0 0 80px 0;
        @media ${theme.device.mobile} {
          padding: 0;
        }
      `}
    >
      {!isMobile && (
        <label htmlFor={'image-upload'}>
          <FilledButtonWithIcon
            renderIcon={<CameraIcon color={theme.colors.grey[0]} />}
            label={'사진등록'}
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
            }}
            color={'red'}
            filled={true}
          />
        </label>
      )}
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        id={'image-upload'}
        ref={inputRef}
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <div
        css={css`
          width: 100%;
          height: 320px;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {isMobile ? (
          <label htmlFor="image-upload" css={css`z-index: 999`}>
            <MaskedImage
              file={profileImage}
              currenTFrameShape={param.petProfileFrame}
              theme={theme}
            />
          </label>
        ) : (
          <MaskedImage
            file={profileImage}
            currenTFrameShape={param.petProfileFrame}
            theme={theme}
          />
        )}

        <div css={css`
          width: 100%;
          position: absolute;
          display: flex;
          justify-content: space-between;
          padding: 0 28px;

          @media ${theme.device.mobile} {
            padding: 0 20px;
          }
        `}>
          <PhotoArrowButton onClick={() => handleCurrenTFrameShape('left')} direction={'left'} />
          <PhotoArrowButton onClick={() => handleCurrenTFrameShape('right')} direction={'right'} />
        </div>
      </div>
      <div
        css={css`
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
        `}
      >
        {thumbKeys.map((key) => {
          const Thumb = Thumbs[key];
          return (
            <div
              key={key}
              css={css`
                width: 24px;
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <Thumb color={param.petProfileFrame === key ? '#F15139' : '#B3B3B3'} />
            </div>
          )
        })
        }
      </div>
    </div>
  );
};

export default ProfileSettingStep4;
