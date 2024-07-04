import React, { useState } from 'react';
import { css } from '@emotion/react';

type TPosition = {
  x: number;
  y: number;
}

type Props = {
  position: TPosition;
}

const ColorPallet = ({}: Props) => {
  const [position, setPosition] = useState<TPosition>({ x: 0, y: 0 });

  return (
    <div css={css`
      position: fixed;
      top: ${position.y}px;
      left: ${position.x}px;
    `}>

    </div>
  );
};

export default ColorPallet;
