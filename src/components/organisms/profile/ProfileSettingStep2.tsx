'use client';

import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';
import { useDevice } from '@/context/DeviceContext';
import SegmentedButton from '@/components/atoms/buttons/SegmentedButton';
import { useRecoilState } from 'recoil';
import { secondStep } from '@/recoil/store';
import InputCalendarItem from '@/components/atoms/input/InputCalendarItem';

export type TPetGender = {
  gender: '수컷' | '암컷' | '기타',
  value: 'M' | 'F' | 'O'
}

const genderList: TPetGender[] = [
  {
    gender: '수컷',
    value: 'M',
  },
  {
    gender: '암컷',
    value: 'F',
  },
  {
    gender: '기타',
    value: 'O',
  },
];

const ProfileSettingStep2 = () => {
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [param, setParam] = useRecoilState(secondStep);
  const [gender, setGender] = useState<Partial<TPetGender>>(genderList.find((item) => item.value === param.petGender) ?? {});

  const petGenderHandler = (obj: TPetGender) => {
    setGender(obj);
    setParam({ ...param, petGender: obj.value });
  };

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
        <ThemedText type={isMobile ? 'labelMedium' : 'labelLarge'}>성별</ThemedText>
        <div css={css`
          display: flex;
          gap: 0.5rem;
        `}>
          {genderList.map((item, index) => (
            <SegmentedButton
              key={index}
              onChange={() => petGenderHandler(item)}
              name={'gender'}
              id={`gender-${item.value}`}
              checked={gender?.value === item.value}
            >
              {item.gender}
            </SegmentedButton>
          ))}
        </div>
        <div css={css`
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        `}>
          <div css={css`
            flex: 1;
            display: flex;
            align-items: center;
            gap: 0.25rem;
          `}>
            <ThemedText type={isMobile ? 'labelMedium' : 'labelLarge'}>성별</ThemedText>
            <span css={css`
              flex: 1;
              border-top: 1px solid ${theme.colors.grey[200]};
              height: 1px;
            `} />
            <ThemedText
              css={css`
                color: ${theme.colors.grey[500]};
              `}
              type={'captionLarge'}
            >알 수 없는 경우 건너뛰기</ThemedText>
          </div>
          <div css={css`
            display: flex;
            gap: 0.5rem;
          `}>
            <InputCalendarItem
              value={param.birthDate}
              setValue={(date) => setParam({ ...param, birthDate: date })}
              validate={true}
              placeholder={'생년월일을 입력해주세요'}
            />
            <InputCalendarItem
              value={param.birthDate}
              setValue={(date) => setParam({ ...param, birthDate: date })}
              validate={true}
              placeholder={'생년월일을 입력해주세요'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingStep2;
