import Header from '@/components/organisms/Header';
import MemoryPopup from '@/components/templates/memory/MemoryPopup';
import CommentArea from '@/components/templates/template/CommentArea';
import CommentPopup from '@/components/templates/template/CommentPopup';
import IntroArea from '@/components/templates/template/IntroArea';
import MemoryArea from '@/components/templates/template/MemoryArea';
import ProfileBanner from '@/components/templates/template/ProfileBanner';
import TemplateTabMemu from '@/components/templates/template/TemplateTabMemu';
import { useDevice } from '@/context/DeviceContext';
import { css, useTheme } from '@emotion/react';
import { useState } from 'react';

export type TTemaplatePopup = 'comment' | 'memory';

const TemplatePage = () => {
  const theme = useTheme();
  const { isMobile } = useDevice();

  const [popup, setPopup] = useState<'' | TTemaplatePopup>('');
  const [selectedTabId, setSelectedTabId] = useState(1);

  const handleOpenPopUp = (type: TTemaplatePopup) => {
    setPopup(type);
  };
  const handleClosePopup = () => {
    setPopup('');
  };

  return isMobile ? (
    <div>
      <div
        css={css`
          height: 120px;
          background-color: #3a55ad;
        `}
      ></div>
      <ProfileBanner />
      <TemplateTabMemu
        selectedTabId={selectedTabId}
        setSelectedTabId={setSelectedTabId}
      />
      {selectedTabId === 1 ? (
        <MemoryArea handleOpenPopup={handleOpenPopUp} />
      ) : selectedTabId === 2 ? (
        <CommentArea handleOpenPopup={handleOpenPopUp} />
      ) : (
        <IntroArea />
      )}
    </div>
  ) : (
    <div
      css={css`
        position: relative;
      `}
    >
      <CommentPopup open={popup === 'comment'} onClose={handleClosePopup} />
      <MemoryPopup
        open={popup === 'memory'}
        onClose={handleClosePopup}
        thumbImgs={['', '', '']}
        date='2023. 05. 24.'
        title='입만 웃는 기묘한 뇨속..'
        content={`어제 복실이랑 또아 인증샷 찍는데 끼어든 ’입만 웃는 그놈‘ 그리고 끝까지 카메라에 나오려고 애쓰는 짱플루언서…\n“그 애는 항상 웃고 있었어요, 근데 눈은 웃질 않았죠… 기묘한 아이였어요…🙂”`}
        flowerAmount={123}
        commentAmount={123}
      />
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 360px;
          background-color: #3a55ad;
          @media ${theme.device.mobile} {
            position: static;
            height: 120px;
          }
        `}
      ></div>
      <div
        css={css`
          margin: 0 auto;
          width: 1160px;
          display: flex;
          flex-direction: column;
          gap: 96px;
        `}
      >
        <Header type='home-login' color='default' />
        <div>
          <ProfileBanner />
          <CommentArea handleOpenPopup={handleOpenPopUp} />
        </div>
        <div
          css={css`
            width: 100%;
            height: 1px;
            background-color: ${theme.colors.grey[900]};
            opacity: 0.1;
          `}
        ></div>
        <MemoryArea handleOpenPopup={handleOpenPopUp} />
      </div>
    </div>
  );
};
export default TemplatePage;
