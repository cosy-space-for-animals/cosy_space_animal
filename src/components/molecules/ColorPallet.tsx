'use client';

import React, {} from 'react';
import { css, useTheme } from '@emotion/react';
import { TColor } from '@/types/theme';
import { useDevice } from '@/context/DeviceContext';

export type TPosition = {
  x: number;
  y: number;
}

type Props = {
  position: TPosition;
  colors: TColor[];
  currentColor?: TColor;
  onSelect: (color: TColor) => void;
  availableColors: string[];
}

const ColorPallet = (
  {
    position,
    colors,
    currentColor,
    onSelect,
    availableColors,
  }: Props) => {
  const theme = useTheme();
  const { isMobile } = useDevice();

  return (
    <div css={css`
      position: fixed;
      top: ${position.y + 9}px;
      left: ${position.x}px;
      background: ${theme.colors.grey[800]};
      transform: ${isMobile ? null : 'translate(-50%, 0)'};
      display: flex;
      padding: 12px;
      gap: 6px;
      border-radius: 8px;
    `}>
      {
        colors.map((color, index) => {
          return (
            <button
              key={index}
              css={css`
                position: relative;
                width: ${isMobile ? '24px' : '16px'};
                height: ${isMobile ? '24px' : '16px'};
                border-radius: 50%;
                background: ${color}${!availableColors.includes(color) ? '80' : ''};
                border: 2px solid ${currentColor === color ? theme.colors.grey[0] : theme.colors.grey[800]};
              `}
              onClick={() => onSelect(color)}
              disabled={!availableColors.includes(color || '')}
            >
              {/* disabled 일 때 보이는 대각선*/}
              {
                !availableColors.includes(color) && (
                  isMobile ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="19" width="27" height="1.5" rx="0.75" transform="rotate(-45 0 19)" fill="#E43333" />
                      </svg>

                    ) :
                    (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="13" width="18" height="1" rx="0.5" transform="rotate(-45 0 13)" fill="#E43333" />
                      </svg>
                    )
                )
              }
            </button>
          );
        })
      }
    </div>
  );
};

export default ColorPallet;
