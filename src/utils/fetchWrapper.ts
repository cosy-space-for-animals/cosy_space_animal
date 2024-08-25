import { getCookie, setCookie } from './common';

interface IRequestInit extends RequestInit {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TEST_URL = 'https://jsonplaceholder.typicode.com'; // ?

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*', // ?
  },
};

const rewrite = (url: string): string => {
  if (url.startsWith(`/public`)) {
    // for local(public) json files
    return url.slice(7);
  }
  if (url.startsWith('/todos')) {
    return `${TEST_URL}${url}`;
  }
  return `${BASE_URL}${url}`;
};

/**
 * @example await fetchWrapper(url, options);
 */

export const fetchWrapper = async <T>(
  url: string,
  options?: IRequestInit,
): Promise<T> => {
  const accessToken = getCookie('accessToken');
  const mergedOptions = Object.assign({}, defaultOptions, options);

  try {
    const response = await fetch(rewrite(url), {
      ...mergedOptions,

      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...mergedOptions?.headers,
      },
    });

    if (!response.ok) {
      const error = {
        message: `HTTP error! status: ${response.status}`,
        status: response.status,
        response: await response.json(),
      };
      throw error;
    }

    const data = await response.json();

    if (response.status === 202) {
      const token = data.token;
      setCookie('accessToken', token, 3);

      const opt = {
        ...mergedOptions,
        headers: {
          Authorization: `Bearer ${token}`,
          ...mergedOptions?.headers,
        },
      };

      const retry = await fetch(rewrite(url), opt);
      return await retry.json();
    }

    return data;
  } catch (error) {
    if (url.startsWith('/api') && error.status === 406) {
      // TODO: 로그인 모달로 이동
      location.replace('/');
    }

    throw error;
  }
};

export default fetchWrapper;
