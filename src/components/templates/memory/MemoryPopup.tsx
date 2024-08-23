import MemoryActionButton from '@/components/molecules/memory/MemoryActionButton';
import Popup from '@/components/molecules/Popup';
import { css, useTheme } from '@emotion/react';
import Image from 'next/image';
import sampleMemoryThumbnail from '@/assets/images/sampleMemoryThumbnail.png';
import ShareIcon from '@/assets/icon/ShareIcon';
import MoreVerticalIcon from '@/assets/icon/MoreVerticalIcon';
import { useState } from 'react';
import InputComment from '@/components/organisms/comment/InputComment';
import MemoryPhoto from '@/components/molecules/memory/MemoryPhoto';
import { IPopupProps } from '@/types/common';
import MemoryCommentItem from '@/components/organisms/memory/MemoryCommentItem';

interface IProps {
  thumbImgs: string[];
  date: string;
  title: string;
  content: string;
  flowerAmount: number;
  commentAmount: number;
  isProfile?: boolean;
  profileImg?: string;
  name?: string;
}

const MemoryPopup = ({
  open,
  onClose,
  thumbImgs,
  date,
  title,
  content,
  flowerAmount,
  commentAmount,
  isProfile,
  profileImg,
  name,
}: IProps & IPopupProps) => {
  const theme = useTheme();

  const [isOpenComment, setIsOpenComment] = useState(false);

  const handleToggleComment = () => {
    setIsOpenComment(!isOpenComment);
  };

  return (
    <Popup open={open} onClose={onClose}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        {isProfile ? (
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
                font-size: ${theme.fontSizes.sm}px;
              `}
            >
              {name}
            </span>
          </div>
        ) : null}
        <div
          css={css`
            display: flex;
            gap: 24px;
          `}
        >
          <MemoryPhoto thumbImgs={thumbImgs} />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: end;
              gap: 8px;
              width: 400px;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 16px;
                padding: 16px 0;
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 4px;
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
                <p
                  css={css`
                    font-weight: ${theme.fontWeights.bold};
                    font-weight: 18px;
                  `}
                >
                  {title}
                </p>
              </div>
              {!isOpenComment ? <p>{content}</p> : null}
            </div>
            <div
              css={css`
                height: 1px;
                background: ${theme.colors.grey[200]};
              `}
            ></div>
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
                  gap: 12px;
                `}
              >
                <MemoryActionButton type='flower' amount={flowerAmount} />
                <MemoryActionButton
                  type='comment'
                  amount={commentAmount}
                  onClick={handleToggleComment}
                />
                <button>
                  <ShareIcon color={theme.colors.grey[700]} />
                </button>
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
            {isOpenComment ? (
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  flex-wrap: nowrap;
                  gap: 8px;
                `}
              >
                <ul
                  css={css`
                    border-radius: 6px;
                    border: 1px solid ${theme.colors.grey[100]};
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    background: ${theme.colors.grey[50]};
                    height: 360px;
                    overflow-y: auto;
                  `}
                >
                  <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='저희 강아지도 올해 봄에 강아지별로 떠나갔어요. 마음 잘 추스리시길 바랍니다.. 위로의 말씀 전해요..'
                  />
                  {/* <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='코코 목줄 정보 알 수 있을까요?'
                  />
                  <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='코코 목줄 정보 알 수 있을까요?'
                  />
                  <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='코코 목줄 정보 알 수 있을까요?'
                  />
                  <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='코코 목줄 정보 알 수 있을까요?'
                  />
                  <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='코코 목줄 정보 알 수 있을까요?'
                  />
                  <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='코코 목줄 정보 알 수 있을까요?'
                  />
                  <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='코코 목줄 정보 알 수 있을까요?'
                  />
                  <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='저희 강아지도 올해 봄에 강아지별로 떠나갔어요. 마음 잘 추스리시길 바랍니다.. 위로의 말씀 전해요..'
                  />
                  <MemoryCommentItem
                    profileImg=''
                    name='몽구'
                    time='10분 전'
                    comment='저희 강아지도 올해 봄에 강아지별로 떠나갔어요. 마음 잘 추스리시길 바랍니다.. 위로의 말씀 전해요..'
                  /> */}
                </ul>
                <InputComment placeHolder='댓글을 작성해 주세요' />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default MemoryPopup;
