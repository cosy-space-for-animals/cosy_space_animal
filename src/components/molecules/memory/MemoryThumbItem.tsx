import { css, useTheme } from '@emotion/react';
import Image from 'next/image';
import sampleMemoryThumbnail from '@/assets/images/sampleMemoryThumbnail.png';
import PlusIcon from '@/assets/icon/PlusIcon';
import CloseIcon from '@/assets/icon/CloseIcon';
import CameraIcon from '@/assets/icon/CameraIcon';

interface IProps {
  thumbImg?: string;
  type: 'empty' | 'inactive' | 'active' | 'add';
  state?: 'default' | 'disabled' | 'representative';
  amount?: number;
}

const LIMIT = 10;

const MemoryThumbItem = ({ thumbImg, type, state, amount }: IProps) => {
  const theme = useTheme();
  return (
    <div>
      {/* mobile */}
      <div
        css={css`
          display: none;
          position: relative;
          width: 64px;
          height: 64px;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          border: 1px solid ${theme.colors.grey[900]};
          background: ${theme.colors.grey[50]};
          opacity: ${state === 'disabled' ? 0.5 : 1};
          @media ${theme.device.mobile} {
            display: flex;
          }
        `}
      >
        {type === 'inactive' ? (
          <div
            css={css`
              display: flex;
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <Image
              src={sampleMemoryThumbnail}
              alt='썸네일 이미지'
              width={62}
              height={62}
              css={css`
                border-radius: 8px;
                object-fit: cover;
              `}
            />
          </div>
        ) : null}
        {type === 'inactive' ? (
          <button
            css={css`
              position: absolute;
              top: -5px;
              right: -5px;
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #17171790;
              border-radius: 50%;
            `}
          >
            <CloseIcon color={theme.colors.grey[0]} size={10} />
          </button>
        ) : null}
        {type === 'add' ? (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 4px;
            `}
          >
            <CameraIcon color={theme.colors.primary[500]} />
            <span
              css={css`
                font-size: ${theme.fontSizes.sm}px;
                color: ${theme.colors.grey[600]};
              `}
            >
              <span
                css={css`
                  color: ${theme.colors.primary[500]};
                `}
              >
                {amount}
              </span>{' '}
              / {LIMIT}
            </span>
          </div>
        ) : null}
        {state === 'representative' ? (
          <span
            css={css`
              z-index: 1;
              position: absolute;
              bottom: -5px;
              border-radius: 6px;
              border: 1px solid ${theme.colors.primary[500]};
              background: ${theme.colors.grey[0]};
              padding: 2.5px 6px;
              font-weight: ${theme.fontWeights.semibold};
              font-size: ${theme.fontSizes.xs}px;
              color: ${theme.colors.primary[500]};
            `}
          >
            대표 사진
          </span>
        ) : null}
      </div>
      {/* pc */}
      <div
        css={css`
          display: flex;
          position: relative;
          width: 64px;
          height: 64px;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          border: 1px solid
            ${type === 'inactive'
              ? theme.colors.grey[900]
              : type === 'active'
                ? theme.colors.primary[500]
                : theme.colors.grey[200]};
          background: ${theme.colors.grey[100]};
          opacity: ${state === 'disabled' ? 0.5 : 1};
          cursor: ${state === 'disabled'
            ? 'auto'
            : type === 'inactive' || type === 'active' || type === 'add'
              ? 'pointer'
              : 'auto'};
          &:hover {
            background: ${type === 'add' ? theme.colors.grey[150] : ''};
            /* layer */
            & > div {
              display: block;
            }
            /* delete */
            & > button {
              display: flex;
            }
          }
          @media ${theme.device.mobile} {
            display: none;
          }
        `}
      >
        {type === 'inactive' || type === 'active' ? (
          <div
            css={css`
              display: flex;
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <Image
              src={sampleMemoryThumbnail}
              alt='썸네일 이미지'
              width={62}
              height={62}
              css={css`
                border-radius: 8px;
                object-fit: cover;
              `}
            />
          </div>
        ) : null}
        {type === 'inactive' || type === 'active' ? (
          <div
            css={css`
              display: none;
              width: 64px;
              height: 64px;
              background: #1717171a;
              position: absolute;
              top: 0;
              left: 0;
              border-radius: 8px;
            `}
          ></div>
        ) : null}
        {type === 'inactive' || type === 'active' ? (
          <button
            css={css`
              position: absolute;
              top: 3px;
              right: 3px;
              width: 16px;
              height: 16px;
              display: none;
              justify-content: center;
              align-items: center;
              background: #17171780;
              border-radius: 50%;
            `}
          >
            <CloseIcon color={theme.colors.grey[0]} size={8} />
          </button>
        ) : null}
        {type === 'add' ? (
          <span
            css={css`
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px dashed ${theme.colors.grey[300]};
              border-radius: 50%;
            `}
          >
            <PlusIcon color={theme.colors.grey[500]} />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default MemoryThumbItem;
