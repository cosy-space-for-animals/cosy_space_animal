import Scrim from '@/components/atoms/Scrim';
import { css } from '@emotion/react';
import { useState } from 'react';

const SignUp = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
      `}
    >
      <Scrim setScrim={() => {}}>dd</Scrim>
    </div>
  );
};

export default SignUp;
