import Header from '@/components/organisms/Header';
import CommentArea from '@/components/templates/template/CommentArea';
import CommentPopup from '@/components/templates/template/CommentPopup';
import MemoryArea from '@/components/templates/template/MemoryArea';
import MemoryPopup from '@/components/templates/template/MemoryPopup';
import ProfileBanner from '@/components/templates/template/ProfileBanner';
import { useDevice } from '@/context/DeviceContext';
import { css, useTheme } from '@emotion/react';
import { useState } from 'react';

export type TTemaplatePopup = 'comment' | 'memory';

const TemplatePage = () => {
  const theme = useTheme();
  const { isMobile } = useDevice();

  const [popup, setPopup] = useState<'' | TTemaplatePopup>('');

  const handleOpenPopUp = (type: TTemaplatePopup) => {
    setPopup(type);
  };
  const handleClosePopup = () => {
    setPopup('');
  };

  return (
    <div>
      <CommentPopup open={popup === 'comment'} onClose={handleClosePopup} />
      <MemoryPopup open={popup === 'memory'} onClose={handleClosePopup} />
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
          @media ${theme.device.mobile} {
            width: 100%;
            gap: 0;
          }
        `}
      >
        {!isMobile ? <Header type='home-login' color='default' /> : null}
        <div>
          <ProfileBanner />
          {/* <CommentArea handleOpenPopup={handleOpenPopUp} /> */}
        </div>
        {/* <div
          css={css`
            width: 100%;
            height: 1px;
            background-color: ${theme.colors.grey[900]};
            opacity: 0.1;
          `}
        ></div> */}
        {/* <MemoryArea handleOpenPopup={handleOpenPopUp} /> */}
      </div>
    </div>
  );
};

export default TemplatePage;
