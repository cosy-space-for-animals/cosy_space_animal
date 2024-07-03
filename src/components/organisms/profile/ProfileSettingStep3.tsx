'use client';

import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';
import { useDevice } from '@/context/DeviceContext';
import { useRecoilState } from 'recoil';
import { thirdStep } from '@/recoil/store';
import InputCharacterCounterItem from '@/components/atoms/input/InputCharacterCouterItem';


const ProfileSettingStep3 = () => {
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [param, setParam] = useRecoilState(thirdStep);

  return (
    <div css={css`
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 60px;
      gap: 2rem;
      @media ${theme.device.mobile} {
        padding: 0;
      }
    `}>
      <div css={css`
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      `}>
        <ThemedText type={isMobile ? 'labelMedium' : 'labelLarge'}>소개</ThemedText>
        <div css={css`
          display: flex;
          gap: 0.5rem;
        `}>
          <InputCharacterCounterItem
            value={param.petDesc}
            validate={true}
            setValue={(e: string) => setParam({ ...param, petDesc: e })}
            maxLength={90}
            placeholder="소개글을 입력해주세요"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingStep3;
