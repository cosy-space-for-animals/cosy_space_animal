import { fetchWrapper, SuccessResponse } from '@/utils/fetch';
import { authenticatedAtom } from '@/recoil/store';
import { useRecoilState } from 'recoil';
import { getCookie, removeCookie } from '@/utils/common';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useAthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticatedAtom);

  const fetchLogin = async (email: string, password: string) => {
    try {
      const url = '/api/auth/login';
      const { data } = await fetchWrapper(url, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      throw error;
    }
  }

  const fetchLogout = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      removeCookie('accessToken');
      setIsAuthenticated(false);
      // logout api 호출
      // const url = '/logout';
      // const res = await fetch(`${BASE_URL}${url}`);
      //
      // if (res.status === 200) {
      //   setIsAuthenticated(false);
      //   removeCookie('accessToken');
      //   return res.json();
      // } else {
      //   throw new Error('Failed to logout');
      // }
    } catch (error) {
      throw error;
    }
  }

  return {
    fetchLogin,
    fetchLogout,
  }
}
