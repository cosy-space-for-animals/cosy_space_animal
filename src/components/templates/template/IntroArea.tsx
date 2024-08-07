import FavoriteTag from '@/components/atoms/FavoriteTag';
import { css, useTheme } from '@emotion/react';

const IntroArea = () => {
  const theme = useTheme();

  const box = css`
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    & > span {
      font-weight: ${theme.fontWeights.medium};
      font-size: ${theme.fontSizes.md}px;
      color: ${theme.colors.grey[700]};
    }
  `;

  return (
    <div>
      <div css={box}>
        <span>소개</span>
        <p>
          마이 네임 이즈 코코. 해버 굿 데이. 땡쿠. 마이 네임 이즈 코코. 해버 굿
          데이. 땡쿠. 마이 네임 이즈 코코. 해버 굿 데이. 땡쿠.
        </p>
      </div>
      <div
        css={css`
          height: 8px;
          background: #1717170d;
        `}
      ></div>
      <div css={box}>
        <span>좋아하는 것</span>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          `}
        >
          <FavoriteTag color='pink' text='꽃냄새_맡기' />
          <FavoriteTag color='green' text='무한산책' />
          <FavoriteTag color='yellow' text='눈밭에서_뒹굴기' />
        </div>
      </div>
    </div>
  );
};

export default IntroArea;
