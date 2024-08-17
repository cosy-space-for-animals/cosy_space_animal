import { css, useTheme } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';
import RollingScrollBanner from '@/components/organisms/RollingScrollBanner';
import MainButton from '@/components/atoms/buttons/MainButton';
import { useDevice } from '@/context/DeviceContext';
import { useRouter } from 'next/router';
import Header from '@/components/organisms/Header';
import MemoryGrid from '@/components/templates/memory/MemoryGrid';
import ArrowButton from '@/components/atoms/buttons/ArrowButton';
import FilledButtonWithIcon from '@/components/atoms/buttons/FilledButtonWithIcon';
import MemoIcon from '@/assets/icon/MemoIcon';
import { useQuery } from '@tanstack/react-query';
import { fetchWrapper, SuccessResponse } from '@/utils/fetch';
import { getCookie } from '@/utils/common';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authenticatedAtom } from '@/recoil/store';
import { useEffect } from 'react';

type RecentMemoryInfo = {
  currentPage: number;
  dataCounts: number;
  memoryResponseDto: [];
  totalPage: number;
}

type ResponseMemoryInfo = {
  recentMemoryInfoResponse: RecentMemoryInfo;
}

export default function Home() {
  const theme = useTheme();
  const { isMobile } = useDevice();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticatedAtom);

  const { data: recentMemory, isSuccess } = useQuery({
    queryKey: ['recentMemory'],
    queryFn: async () => {
      try {
        const { data } = await fetchWrapper<SuccessResponse<ResponseMemoryInfo>>('/api/recent-memories?petId=2&currentPage=1&dataCounts=20');
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Header type={isAuthenticated ? 'home-login' : 'home-logout'} color={'default'} />
      {isMobile ? (
        <>
          <section css={css`
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          `}>
            <ThemedText
              cssStyle={css`
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 20px;
              `}
            >
              모바일 화면입니다.
            </ThemedText>
            <MainButton
              onClick={() => {
                router.push('/profile');
              }}
            >
              프로필 수정하기
            </MainButton>
          </section>
          <RollingScrollBanner />
        </>
      ) : (
        <>
          <section css={css`
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            background-color: ${theme.colors.grey[0]};
          `}>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
              `}
            >
              <ThemedText
                type={'headlineSmall'}
              >
                코코의 소중한 추억을 <br /> 친구들에게 공유해보세요
              </ThemedText>
              <div css={css`
                width: fit-content;
              `}>
                <FilledButtonWithIcon
                  renderIcon={<MemoIcon color={theme.colors.grey[700]} />}
                  filled={false}
                  label="추억 올리기"
                  color={'black'}
                  onClick={() => {
                  }}
                />
              </div>
            </div>
          </section>
          {(isSuccess && recentMemory?.recentMemoryInfoResponse.dataCounts > 0) && (
            <section
              css={css`
                min-height: 100vh;
                padding: 160px 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 4rem;
              `}
            >
              <ThemedText type={'titleMedium'}>
                내 친구들은 어떤 추억을 공유했을까요?
              </ThemedText>

              <MemoryGrid memoryItems={data?.recentMemoryInfoResponse.memoryResponseDto} />

              <ArrowButton
                type={'outline'}
                onClick={() => {
                  console.log('더보기 버튼 클릭');
                }}
              >
                더보기
              </ArrowButton>
            </section>
          )}
          <section css={css`
            padding: 160px 0;
            background-color: ${theme.colors.grey[700]};
            color: ${theme.colors.grey[0]};
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 4rem;
          `}>
            <ThemedText
              type={'titleMedium'}
            >
              새로운 친구를 만나보세요!
            </ThemedText>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 1rem;
              `}
            >
              <div
                css={css`
                  height: 20rem;
                `}
              >
                캐러셀
              </div>
              <FilledButtonWithIcon
                renderIcon={<MemoIcon color={theme.colors.grey[0]} />}
                filled={false}
                label="123"
                color={'white'}
                onClick={() => {
                }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}
