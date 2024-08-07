import { css, useTheme } from '@emotion/react';
import Image from 'next/image';
import sampleMemoryThumbnail from '@/assets/images/sampleMemoryThumbnail2.png';
import MoreVerticalIcon from '@/assets/icon/MoreVerticalIcon';
import MemoryThumbIcon from '@/components/molecules/memory/MemoryThumbIcon';
import MemoryActionButton from '@/components/molecules/memory/MemoryActionButton';
import ShareIcon from '@/assets/icon/ShareIcon';
import ThumbMoreBadge from '@/components/atoms/ThumbMoreBadge';

interface IProps {
  thumbImgs: string[];
  date: string;
  title: string;
  content?: string;
  flowerAmount: number;
  commentAmount: number;
  isProfile?: boolean;
  profileImg?: string;
  name?: string;
}

const MemoryItem = ({
  thumbImgs,
  date,
  title,
  content,
  flowerAmount,
  commentAmount,
  isProfile,
  profileImg,
  name,
}: IProps) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        border-radius: 12px;
        border: 1px solid ${theme.colors.grey[700]};
        padding: 8px;
        background: ${theme.colors.grey[0]};
        /* width: fit-content; */
        display: flex;
        flex-direction: column;
        gap: 8px;
        /* width: 360px; */
        &:hover {
          background: ${theme.colors.grey[100]};
        }
        @media ${theme.device.mobile} {
          /* width: 343px; */
        }
      `}
    >
      {isProfile ? (
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <div
              css={css`
                display: flex;
              `}
            >
              <Image
                src={sampleMemoryThumbnail}
                alt='프로필 이미지'
                width={32}
                height={32}
                css={css`
                  border-radius: 50%;
                  border: 0.5px solid ${theme.colors.grey[900]};
                  object-fit: cover;
                `}
              />
            </div>
            <span
              css={css`
                font-weight: ${theme.fontWeights.medium};
                font-size: ${theme.fontSizes.sm};
              `}
            >
              {name}
            </span>
          </div>
          <button
            css={css`
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <MoreVerticalIcon color={theme.colors.grey[400]} />
          </button>
        </div>
      ) : null}
      <div
        css={css`
          width: fit-content;
          position: relative;
        `}
      >
        {thumbImgs.length > 1 ? (
          <div
            css={css`
              z-index: 1;
              position: absolute;
              top: 8px;
              right: 8px;
            `}
          >
            <ThumbMoreBadge moreNum={thumbImgs.length - 1} />
          </div>
        ) : null}
        <div
          css={css`
            display: flex;
          `}
        >
          <Image
            src={sampleMemoryThumbnail}
            alt='썸네일 이미지'
            css={css`
              border-radius: 8px;
              border: 1px solid ${theme.colors.grey[700]};
              object-fit: cover;
              width: 100%;
              /* height: 100%; */
              @media ${theme.device.mobile} {
                /* width: 327px;
                height: 280px; */
              }
            `}
          />
        </div>
      </div>
      <div
        css={css`
          padding: 4px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 13px;
              color: ${theme.colors.grey[500]};
            `}
          >
            {date}
          </span>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 8px;
              @media ${theme.device.mobile} {
                display: none;
              }
            `}
          >
            <MemoryThumbIcon type='flower' amount={flowerAmount} />
            <MemoryThumbIcon type='comment' amount={commentAmount} />
          </div>
        </div>
        <p
          css={css`
            font-weight: ${theme.fontWeights.medium};
          `}
        >
          {title}
        </p>
        {content ? (
          <p
            css={css`
              display: none;
              font-size: ${theme.fontSizes.sm};
              color: ${theme.colors.grey[700]};
              @media ${theme.device.mobile} {
                display: block;
              }
            `}
          >
            {content}
          </p>
        ) : null}
      </div>
      <div
        css={css`
          display: none;
          justify-content: space-between;
          align-items: center;
          padding-top: 4px;
          border-top: 1px solid ${theme.colors.grey[200]};
          @media ${theme.device.mobile} {
            display: flex;
          }
        `}
      >
        <div
          css={css`
            padding: 0 8px;
            display: flex;
            gap: 12px;
          `}
        >
          <MemoryActionButton type='flower' amount={flowerAmount} />
          <MemoryActionButton type='comment' amount={commentAmount} />
        </div>
        <button>
          <ShareIcon color={theme.colors.grey[700]} />
        </button>
      </div>
    </div>
  );
};

export default MemoryItem;
