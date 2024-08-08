import CloseIcon from '@/assets/icon/CloseIcon';
import { IPopupProps } from '@/types/common';
import { css, useTheme } from '@emotion/react';
import { ReactNode } from 'react';

interface IProps extends IPopupProps {
  children: ReactNode;
}

const Popup = ({ children, open, onClose }: IProps) => {
  const theme = useTheme();
  return open ? (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 3;
      `}
      onClick={onClose}
    >
      <div
        css={css`
          min-width: 500px;
          min-height: 500px;
          max-height: 85%;
          border-radius: 16px;
          border: 1px solid ${theme.colors.grey[700]};
          padding: 20px;
          background-color: ${theme.colors.grey[0]};
          position: relative;
          box-shadow: 0px 4px 4px 0px #00000040;
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          css={css`
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 16px;
            right: 16px;
          `}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Popup;
