import CloseIcon from '@/assets/icon/CloseIcon';
import Scrim from '@/components/atoms/Scrim';
import { css, useTheme } from '@emotion/react';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

interface IUserPopupProps {
  render: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}

const UserPopup = ({ title, render, children }: IUserPopupProps) => {
  const theme = useTheme();
  const closeIconColor = theme.colors.grey[500];

  function close() {
    render((prev) => !prev);
  }

  return (
    <Scrim setScrim={render}>
      <div
        css={css`
          background: white;
          width: fit-content;
          padding: 40px;
          border-radius: 16px;
          border: 1px solid var(--grey-700);
          box-shadow:
            0px 2px 4px 0px #0000000d,
            0px 4px 4px 0px #00000040;
          position: relative;
        `}
      >
        <Image
          width={70}
          height={70}
          src={`clip.svg`}
          alt='clip'
          css={css`
            position: absolute;
            left: -17px;
            top: -15.5px;
          `}
        />
        <div
          onClick={close}
          css={css`
            position: absolute;
            right: 24px;
            top: 24px;
          `}
        >
          <CloseIcon color={closeIconColor} size={24} />
        </div>
        <div
          className='title'
          css={css`
            font-size: 28px;
            font-weight: 500;
            line-height: 36.4px;
            letter-spacing: -0.5px;
            margin-bottom: 32px;
          `}
        >
          {title}
        </div>
        <div className='body'>{children}</div>
      </div>
    </Scrim>
  );
};

export default UserPopup;
