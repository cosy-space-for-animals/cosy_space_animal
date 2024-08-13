import React from 'react';
import RoundButton from '@/components/atoms/buttons/RoundButton';

type Props = {
  mode?: 'default' | 'dark';
}

function AuthenticatedEditHeader({ mode}: Props) {
  return (
    <>
      <RoundButton
        type={mode === 'default' ? 'outline' : 'outline_white'}
        onClick={() => {
          console.log('click');
        }}
      >
        취소
      </RoundButton>
      <RoundButton
        type={mode === 'default' ? 'filled' : 'filled_white'}
        onClick={() => {
          console.log('click');
        }}
      >
        저장
      </RoundButton>
    </>
  );
}


export default AuthenticatedEditHeader;
