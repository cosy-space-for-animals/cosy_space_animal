'use recoil';

import React, { useState } from 'react';
import { css } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';
import InputDefaultItem from '@/components/atoms/input/InputDefaultItem';
import { useRecoilState } from 'recoil';
import { firstStep } from '@/recoil/store';
import { useDebounce } from '@/hooks/useDebounce';
import SearchResultsList from '@/components/molecules/SearchResultsList';
import SegmentedAnimalItem, { i18n } from '@/components/atoms/buttons/SegmentedAnimalItem';
import { Animals } from '@/components/atoms/AnimalIcon';
import { Nullable } from '@/types/global';
import CheckButton from '@/components/atoms/buttons/CheckButton';
import CheckBoxWithLabel from '@/components/molecules/CheckBoxWithLabel';
import { theme } from '@/types/theme';

type Props = {
  isMobile: boolean;

}

const petSpecs: Animals[] = [
  'dog2',
  'cat2',
  'fish',
  'rabbit2',
  'turtle',
  'lizard',
  'other',
];

const ProfileSettingStep1 = ({ isMobile }: Props) => {
  const [obj, setObj] = useRecoilState(firstStep);
  const { debouncedValue } = useDebounce({ value: obj.petName, delay: 500 });

  const setPetName = (str: string) => {
    setObj({
      ...obj,
      petName: str,
    });
  };

  const validatePetName = (str: string) => {
    // 한글 또는 영문 validate
    if (str === '') return true;

    const reg = /^[가-힣a-zA-Z]+$/;

    return reg.test(str);
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
        <ThemedText type={isMobile ? 'labelMedium' : 'labelLarge'}>이름</ThemedText>
        <InputDefaultItem
          value={obj.petName}
          setValue={setPetName}
          errorMessage={'한글 또는 영문만 입력할 수 있어요.'}
          validate={validatePetName(debouncedValue)}
          placeholder={'이름을 입력해주세요'}
        />
      </div>
      <div css={css`
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      `}>
        <ThemedText type={isMobile ? 'labelMedium' : 'labelLarge'}>종류</ThemedText>
        <div css={css`
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 0.25rem;
          column-gap: 0.5rem;
        `}>
          {petSpecs.map((petSpec, index) => (
            <React.Fragment key={index}>
              <SegmentedAnimalItem
                type={petSpec}
                selected={obj.petSpecM === i18n[petSpec].ko}
                setSelected={(str: Animals) => {
                  setObj({
                    ...obj,
                    petSpecM: i18n[str].ko,
                  });
                }}
              />
            </React.Fragment>
          ))}
        </div>
        <SearchResultsList
          searchResults={['품종1', '품종2', '품종3']}
          value={obj.petSpecS === '알수없음' ? '' : obj.petSpecS}
          setValue={(str: string) => {
            setObj({
              ...obj,
              petSpecS: str,
            });
          }}
          placeholder={'품종을 입력해주세요'}
          errorMessage={''}
          validate={true}
          isShown={obj.petSpecS !== '알수없음'}
          disabled={obj.petSpecM === ''}
        />
        <CheckBoxWithLabel
          name={'petSpecM'}
          value={obj.petSpecS === '알수없음'}
          onChange={(e) => {
            setObj({
              ...obj,
              petSpecS: e.target.checked ? '알수없음' : '',
            });
          }}
          label={'품종을 알 수 없어요!'}
        />
      </div>
    </div>
  );
};

export default ProfileSettingStep1;
