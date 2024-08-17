export interface SuccessResponse<T> {
  status: 'success';
  data: T;
}

export type FetchResult<T> = SuccessResponse<T>
