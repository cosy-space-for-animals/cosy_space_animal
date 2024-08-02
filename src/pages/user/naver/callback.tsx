import fetchWrapper from '@/utils/fetchWrapper';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NaverCallback: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // '#' 제거
    const access_token = params.get('access_token');
    const state = params.get('state');
    const token_type = params.get('token_type');
    const expires_in = params.get('expires_in');

    if (params) {
      try {
        fetchWrapper(
          `${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/code/naver`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token,
              state,
              token_type,
              expires_in,
            }),
          },
        );
        // TODO: 쿠키설정
        router.push('/');
      } catch (error) {
        router.back();
        // console.error(error);
      }
    }
  }, []);

  return <div>로딩중입니다...(추후 로딩스피너로 변경 예정)</div>;
};

export default NaverCallback;
