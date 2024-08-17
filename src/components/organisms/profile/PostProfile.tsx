'use client';

import React from 'react';
import { defaultProfileData, profileDataAtom, profileImageAtom, userAtom } from '@/recoil/store';
import ProgressIndicatorDot from '@/components/atoms/ProgressIndicatorDot';
import ProfileMoveButton from '@/components/atoms/buttons/ProfileMoveButton';
import { css } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';
import ProfileSettingStep1 from '@/components/organisms/profile/ProfileSettingStep1';
import { theme } from '@/types/theme';
import ProfileSettingStep2 from '@/components/organisms/profile/ProfileSettingStep2';
import ProfileSettingStep3 from '@/components/organisms/profile/ProfileSettingStep3';
import ProfileSettingStep4 from '@/components/organisms/profile/ProfileSettingStep4';
import { useRouter } from 'next/router';
import { useSSRValue } from '@/lib/recoil/useSSR';
import { fetchWrapper } from '@/utils/fetch/fetchWrapper';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

type Props = {
  step: number;
}

const fetchProfileData = async (formData: FormData) => {

  return await fetchWrapper('/api/pet/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
};

const PostProfile = ({ step }: Props) => {
  const router = useRouter();
  const data = useSSRValue(profileDataAtom, defaultProfileData);
  const profileImage = useSSRValue(profileImageAtom, null);
  const userData = useRecoilValue(userAtom)
  const maxStep = 4;

  const buttonDisabled = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      return step === 1;
    } else {
      if (step === 1) {
        return !data.petName || !data.petSpecM || !data.petSpecS;
      } else if (step === 2) {
        return !data.petGender || !data.birthDate;
      } else if (step === 3) {
        return !data.petDesc;
      } else if (step === 4) {
        return !profileImage;
      }
      return step === maxStep;
    }
  };

  const getHeaderText = (step: number, name: string = ''): string => {
    switch (step) {
      case 1:
        return `반려동물의 이름과 종류를 알려주세요`;
      case 2:
        return `${name}의 성별과 생일을 알려주세요`;
      case 3:
        return `${name}를 소개해 주세요`;
      case 4:
        return `${name}의 사진을 등록해주세요`;
      default:
        return '';
    }
  };

  const paginationHandler = async (type: 'prev' | 'next') => {
    if (type === 'prev') {
      await router.push(`/profile/register/step?step=${step - 1}`);
    } else {
      if (step === maxStep) {
        if (
          data.birthDate.length > 0 &&
          data.petDesc.length > 0 &&
          data.petGender.length > 0 &&
          data.petName.length > 0 &&
          data.petSpecM.length > 0 &&
          data.petSpecS.length > 0 &&
          data.petProfileFrame.length > 0 &&
          profileImage !== null
        ) {
          const form = new FormData();
          console.log({
            memberId: userData.memberId,
            petName: data.petName,
            petDesc: data.petDesc,
            petSpecM: data.petSpecM,
            petSpecS: data.petSpecS,
            petProfileFrame: data.petProfileFrame,
            petGender: data.petGender,
            birthDate: data.birthDate,
            deathDate: data.deathDate,
            petFavs: data.petFavs[0] || '',
            petFavs2: data.petFavs[1] || '',
            petFavs3: data.petFavs[2] || '',
          });
          form.append('petRequestDto', JSON.stringify({
              memberId: userData.memberId,
              petName: data.petName,
              petDesc: data.petDesc,
              petSpecM: data.petSpecM,
              petSpecS: data.petSpecS,
              petProfileFrame: data.petProfileFrame,
              petGender: data.petGender,
              birthDate: data.birthDate,
              deathDate: data.deathDate,
              petFavs: data.petFavs[0] || '',
              petFavs2: data.petFavs[1] || '',
              petFavs3: data.petFavs[2] || '',
            },
          ));
          form.append('petProfileImg', profileImage);
          mutate(form);
        }
        return;
      } else {
        await router.push(`/profile/register/step?step=${step + 1}`);
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: fetchProfileData,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      router.push('/profile/register/complete');
    },
  });

  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      gap: 3rem;
      @media ${theme.device.mobile} {
        padding: 4rem 20px 0 20px;
        gap: 2rem;
        align-items: flex-start;
        justify-content: flex-start;
      }
    `}>
      <div css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        @media ${theme.device.mobile} {
          align-items: flex-start;
        }
      `}>
        <ThemedText type={'titleMedium'}>{getHeaderText(step, data.petName)}</ThemedText>
        {step === 4 && (
          <ThemedText
            type={'bodySmall'}
            css={css`
              color: ${theme.colors.grey[600]};
            `}
          >
            프로필 사진의 최대 파일 크기는
            <span css={css`color: ${theme.colors.primary[500]}`}>2MB</span>
            입니다.
          </ThemedText>
        )}
      </div>

      {step === 1 && <ProfileSettingStep1 />}
      {step === 2 && <ProfileSettingStep2 />}
      {step === 3 && <ProfileSettingStep3 />}
      {step === 4 && <ProfileSettingStep4 />}

      <div css={css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        @media ${theme.device.mobile} {
          width: 100%;
          position: fixed;
          left: 0;
          bottom: 40px;
        }
      `}>
        <ProfileMoveButton
          type={'prev'}
          disabled={buttonDisabled('prev')}
          onClick={() => paginationHandler('prev')}
        />
        <div css={css`
          flex: 1;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        `}>
          {Array.from({ length: maxStep }).map((_, index) => (
            <ProgressIndicatorDot
              type={index + 1 === step ? 'primaryPresent' : (index + 1 < step ? 'primaryAfter' : 'greyAfter')}
              key={index}
              cssStyle={css`
                position: relative;
              `}
            />
          ))}
        </div>
        <ProfileMoveButton
          type={'next'}
          disabled={buttonDisabled('next')}
          onClick={() => paginationHandler('next')}
        />
      </div>
    </div>
  );
};

export default PostProfile;
