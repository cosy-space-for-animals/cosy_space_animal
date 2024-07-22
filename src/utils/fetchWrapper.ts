import { TFetchError, TFetchResponse } from '@/types/common';

const FETCH_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TEST_URL = 'https://jsonplaceholder.typicode.com';

const defaultOptions = {
  method: FETCH_METHODS.GET,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const rewrite = (url: string): string => {
  if (url.startsWith('/api')) {
    // return `${BASE_URL}${url.replace('/api', '/api')}`;
    return url;
  }

  if (url.startsWith('/todos')) {
    return `${TEST_URL}${url}`;
  }

  return `${url}`;
}


/**
 *
 * @param url
 * @param options
 *
 * @example await fetchWrapper(url, options);
 *
 */
export const fetchWrapper = async <T>(url: string, options?: RequestInit): Promise<TFetchResponse<T> | TFetchError> => {
  try {
    const response = await fetch(rewrite(url), {
      ...defaultOptions,
      headers: {
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // wrapping response.json() in await to catch json parsing errors
    // return await response.json();
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default fetchWrapper;
