import Popup from '@/components/molecules/Popup';
import CommentInput from '@/components/organisms/comment/CommentInput';
import MemoryCommentItem from '@/components/organisms/memory/MemoryCommentItem';
import { IPopupProps } from '@/types/common';
import { css, useTheme } from '@emotion/react';

const CommentPopup = ({ open, onClose }: IPopupProps) => {
  const theme = useTheme();
  return (
    <Popup open={open} onClose={onClose}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 12px 4px;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 8px;
            font-weight: ${theme.fontWeights.bold};
            font-size: ${theme.fontSizes['2xl']}px;
            color: ${theme.colors.grey[700]};
          `}
        >
          <span
            css={css`
              color: ${theme.colors.grey[700]};
            `}
          >
            따뜻한 한마디
          </span>
          <span
            css={css`
              color: ${theme.colors.primary[500]};
            `}
          >
            48
          </span>
        </div>
        <ul
          css={css`
            background: ${theme.colors.grey[50]};
            border: 1px solid ${theme.colors.grey[100]};
            border-radius: 8px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            height: 480px;
            overflow-y: auto;
          `}
        >
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
          />
          {/* <MemoryCommentItem
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
          />
          <MemoryCommentItem
            profileImg=''
            name='몽구'
            time='10분 전'
            comment='저희 강아지도 올해 봄에 강아지별로 떠나갔어요. 마음 잘 추스리시길 바랍니다.. 위로의 말씀 전해요..'
          /> */}
        </ul>
        <CommentInput />
      </div>
    </Popup>
  );
};

export default CommentPopup;
