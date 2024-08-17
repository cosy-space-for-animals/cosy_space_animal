import React from 'react';
import { css, useTheme } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';
import { useAthentication } from '@/hooks/use-athentication';

const menuItems = [
  {
    title: '계정 설정',
    path: '/account',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7.5" r="4.75" stroke="#525252" strokeWidth="1.5" />
      <path d="M21 22V22C21 17.5817 17.4183 14 13 14H11C6.58172 14 3 17.5817 3 22V22" stroke="#525252"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  },
  {
    title: '친구 관리',
    path: '/friends',
    icon:
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M16 8.5C17.3807 8.5 18.5 7.38071 18.5 6C18.5 4.61929 17.3807 3.5 16 3.5C14.6193 3.5 13.5 4.61929 13.5 6C13.5 7.38071 14.6193 8.5 16 8.5ZM16 10C18.2091 10 20 8.20914 20 6C20 3.79086 18.2091 2 16 2C13.7909 2 12 3.79086 12 6C12 8.20914 13.7909 10 16 10Z"
              fill="#525252" />
        <path fillRule="evenodd" clipRule="evenodd"
              d="M12.4814 12.5763C12.3922 12.6421 12.2353 12.5284 12.2703 12.4233C12.4193 11.9759 12.5 11.4974 12.5 11C12.5 10.8919 12.5592 10.7911 12.6578 10.7471C13.3732 10.4276 14.1659 10.25 15 10.25H17C20.1756 10.25 22.75 12.8244 22.75 16C22.75 16.4142 22.4142 16.75 22 16.75C21.5858 16.75 21.25 16.4142 21.25 16C21.25 13.6528 19.3472 11.75 17 11.75H15C14.0573 11.75 13.1862 12.0569 12.4814 12.5763Z"
              fill="#525252" />
        <path fillRule="evenodd" clipRule="evenodd"
              d="M8 13.5C9.38071 13.5 10.5 12.3807 10.5 11C10.5 9.61929 9.38071 8.5 8 8.5C6.61929 8.5 5.5 9.61929 5.5 11C5.5 12.3807 6.61929 13.5 8 13.5ZM8 15C10.2091 15 12 13.2091 12 11C12 8.79086 10.2091 7 8 7C5.79086 7 4 8.79086 4 11C4 13.2091 5.79086 15 8 15Z"
              fill="#525252" />
        <path fillRule="evenodd" clipRule="evenodd"
              d="M1.25 21C1.25 17.8244 3.82436 15.25 7 15.25H9C12.1756 15.25 14.75 17.8244 14.75 21C14.75 21.4142 14.4142 21.75 14 21.75C13.5858 21.75 13.25 21.4142 13.25 21C13.25 18.6528 11.3472 16.75 9 16.75H7C4.65279 16.75 2.75 18.6528 2.75 21C2.75 21.4142 2.41421 21.75 2 21.75C1.58579 21.75 1.25 21.4142 1.25 21Z"
              fill="#525252" />
      </svg>,

  },
  {
    title: '활동 내역',
    path: '/activity',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4454 20.7608L3.57617 12.5663C1.35964 10.2582 1.49922 6.4736 3.87922 4.34929C6.24035 2.24181 9.82044 2.65105 11.6863 5.24171L12 5.67724L12.3137 5.24171C14.1796 2.65105 17.7596 2.24181 20.1208 4.34929C22.5008 6.4736 22.6404 10.2582 20.4238 12.5663L12.5546 20.7608C12.2483 21.0797 11.7517 21.0797 11.4454 20.7608Z"
        stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  },
  {
    title: '프로필 전환',
    path: '/profile',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="6.88889" r="4.13889" stroke="#525252" strokeWidth="1.5" />
      <path
        d="M19 19.7781V19.7781C19 15.8507 15.8162 12.667 11.8889 12.667H10.1111C6.18375 12.667 3 15.8507 3 19.7781V19.7781"
        stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="11" y="11" width="12" height="12" rx="6" fill="#F15139" />
      <path
        d="M20.0719 17.6996C19.7536 19.1024 18.4991 20.1496 17 20.1496C15.5008 20.1496 14.2463 19.1024 13.928 17.6996M13.928 17.6996L13.5 18.7496M13.928 17.6996L14.9 18.2246M13.928 16.2996C14.2463 14.8968 15.5008 13.8496 17 13.8496C18.4991 13.8496 19.7536 14.8968 20.0719 16.2996M20.0719 16.2996L19.1 15.7746M20.0719 16.2996L20.5 15.2496"
        stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  },
];

function UserMenu() {
  const theme = useTheme();
  const { fetchLogout } = useAthentication();

  return (
    <div css={css`
      position: absolute;
      top: 100%;
      right: 0;
      background: ${theme.colors.grey[0]};
      width: 240px;
      border-radius: 16px;
      border: 1px solid ${theme.colors.grey[700]};
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `}>
      <div css={css`
        padding: 24px 16px;
        display: flex;
        gap: 16px;
        border-bottom: 4px solid ${theme.colors.grey[100]};
      `}>
        <img src="https://avatars.githubusercontent.com/u/7760?v=4" alt="profile" css={css`
          width: 40px;
          height: 40px;
          border-radius: 50%;
        `} />
        <div css={css`
          display: flex;
          gap: 8px;
          justify-content: space-between;
          align-items: center;
        `}>
          <ThemedText type={'subtitleMedium'}>콜리</ThemedText>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="#B3B3B3" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div css={css`
        display: flex;
        flex-direction: column;
        padding: 12px 0;
      `}>
        {menuItems.map((item, index) => (
          <div key={index}>
            <button css={css`
              display: flex;
              gap: 8px;
              padding: 12px 16px;
              width: 100%;
              align-items: center;
              color: ${theme.colors.grey[700]};
              cursor: pointer;

              &:hover {
                background: ${theme.colors.grey[100]};
              }
            `}>
              {item.icon}
              <ThemedText type={'buttonSmall'}>{item.title}</ThemedText>
            </button>
          </div>
        ))}
        <div>
          <button
            css={css`
              display: flex;
              gap: 8px;
              padding: 12px 16px;
              width: 100%;
              align-items: center;
              color: ${theme.colors.grey[400]};
              cursor: pointer;

              &:hover {
                background: ${theme.colors.grey[100]};
              }

              & svg {
                path {
                  stroke: ${theme.colors.grey[400]};
                }
              }
            `}
            onClick={() => {
              // alert('기능 준비중 입니다.');
              fetchLogout();
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H9" stroke="#B3B3B3"
                    strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 12H13M13 12L9.11111 8M13 12L9.11111 16" stroke="#B3B3B3" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <ThemedText type={'buttonSmall'}>로그아웃</ThemedText>
          </button>
        </div>
      </div>
    </div>
  );
}


export default UserMenu;
