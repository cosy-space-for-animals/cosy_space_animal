import { getCookie, setCookie } from '../common';
import { FetchResult } from '@/utils/fetch/fetchWrapper.types';

const FETCH_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TEST_URL = 'https://jsonplaceholder.typicode.com';

const defaultOptions: RequestInit = {
  method: FETCH_METHODS.GET,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const rewrite = (url: string): string => {
  if (url.startsWith('/api')) {
    return `${BASE_URL}${url.replace('/api', '/api')}`;
  }

  if (url.startsWith('/todos')) {
    return `${TEST_URL}${url}`;
  }

  return url;
};

export const fetchWrapper = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const isServer = typeof window === 'undefined';
  const accessToken = !isServer && getCookie('accessToken');

  try {
    console.log('url:', isServer? rewrite(url) : url);
    const response = await fetch(isServer? rewrite(url) : url, {
      ...defaultOptions,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 202 상태일 때 새로운 토큰으로 재요청하는 경우 처리
    if (response.status === 202) {
      const newToken = (await response.json()).loginInfo.accessToken;
      setCookie('accessToken', newToken);

      const newResponse = await fetch(rewrite(url), {
        ...defaultOptions,
        headers: {
          Authorization: `Bearer ${newToken}`,
          ...(options?.headers || {}),
        },
        ...options,
      });

      return await newResponse.json();
    }

    // 정상적인 응답 처리
    return await response.json();
  } catch (error: any) {
    console.log('error:', error);
    throw error; // 에러를 던져서 호출하는 쪽에서 처리하도록 함
  }
};
