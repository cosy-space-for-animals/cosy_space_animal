import ArrowButton from '@/components/atoms/buttons/ArrowButton';
import CommentArrowButton from '@/components/atoms/buttons/CommentArrowButton';
import CommentInput from '@/components/organisms/comment/CommentInput';
import CommentItem from '@/components/organisms/comment/CommentItem';
import MemoryCommentItem from '@/components/organisms/memory/MemoryCommentItem';
import { useDevice } from '@/context/DeviceContext';
import { TTemaplatePopup } from '@/pages/template';
import { css, useTheme } from '@emotion/react';

interface IProps {
  handleOpenPopup: (type: TTemaplatePopup) => void;
}

const CommentArea = ({ handleOpenPopup }: IProps) => {
  const theme = useTheme();
  const { isMobile } = useDevice();

  return isMobile ? (
    <div
      css={css`
        padding: 32px 16px;
        display: flex;
        flex-direction: column;
        gap: 40px;
      `}
    >
      <CommentInput />
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
        `}
      >
        <li>
          <MemoryCommentItem
            profileImg=''
            name='몽구'
            time='10분 전'
            comment='저희 강아지도 올해 봄에 강아지별로 떠나갔어요. 마음 잘 추스리시길 바랍니다.. 위로의 말씀 전해요..'
          />
        </li>
        <li>
          <MemoryCommentItem
            profileImg=''
            name='코코'
            time='1시간 전'
            comment='나랑 같은 이름이구나! 반가와 :)'
          />
        </li>
        <li>
          <MemoryCommentItem
            profileImg=''
            name='몽구'
            time='10분 전'
            comment='저희 강아지도 올해 봄에 강아지별로 떠나갔어요. 마음 잘 추스리시길 바랍니다.. 위로의 말씀 전해요..'
          />
        </li>
        <li>
          <MemoryCommentItem
            profileImg=''
            name='코코'
            time='1시간 전'
            comment='나랑 같은 이름이구나! 반가와 :)'
          />
        </li>
      </ul>
    </div>
  ) : (
    <div
      css={css`
        padding: 0 16px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        `}
      >
        <span
          css={css`
            font-weight: ${theme.fontWeights.bold};
            font-size: ${theme.fontSizes['2xl']}px;
          `}
        >
          따뜻한 한마디
        </span>
        <ArrowButton
          type='borderlessGrey'
          onClick={() => handleOpenPopup('comment')}
        >
          모두 보기
        </ArrowButton>
      </div>
      <div
        css={css`
          position: relative;
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            position: absolute;
            left: 0;
            z-index: 2;
          `}
        >
          <CommentArrowButton />
        </div>
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 80px;
            height: 100%;
            background: linear-gradient(
              270deg,
              rgba(247, 245, 241, 0) 0%,
              #f7f5f1 100%
            );
            z-index: 1;
          `}
        ></div>
        <ul
          css={css`
            display: flex;
            align-items: start;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 4px;
            & > li {
              width: 360px;
              flex-shrink: 0;
            }
          `}
          className='hide-scrollbar'
        >
          <li>
            <CommentInput />
          </li>
          <li>
            <CommentItem
              profileImg=''
              name='몽구'
              time='10분 전'
              comment='저희 강아지도 올해 봄에 강아지별로 떠나갔어요. 마음 잘 추스리시길 바랍니다.. 위로의 말씀 전해요..'
            />
          </li>
          <li>
            <CommentItem
              profileImg=''
              name='코코'
              time='1시간 전'
              comment='나랑 같은 이름이구나! 반가와 :)'
            />
          </li>
          <li>
            <CommentItem
              profileImg=''
              name='몽구'
              time='10분 전'
              comment='저희 강아지도 올해 봄에 강아지별로 떠나갔어요. 마음 잘 추스리시길 바랍니다.. 위로의 말씀 전해요..'
            />
          </li>
          <li>
            <CommentItem
              profileImg=''
              name='코코'
              time='1시간 전'
              comment='나랑 같은 이름이구나! 반가와 :)'
            />
          </li>
        </ul>
        <div
          css={css`
            position: absolute;
            right: 0;
            z-index: 2;
          `}
        >
          <CommentArrowButton />
        </div>
        <div
          css={css`
            position: absolute;
            top: 0;
            right: 0;
            width: 80px;
            height: 100%;
            background: linear-gradient(
              270deg,
              #f7f5f1 0%,
              rgba(247, 245, 241, 0) 100%
            );
            z-index: 1;
          `}
        ></div>
      </div>
    </div>
  );
};

export default CommentArea;
