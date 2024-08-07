import { useEffect, useState } from 'react';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';

// 커스텀 훅
export function useSSR<T>(recoilState: RecoilState<T>, defaultValue: T) {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(recoilState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}

// value만 반환하는 경우
export function useSSRValue<T>(recoilState: RecoilState<T>, defaultValue: T) {
  const [isInitial, setIsInitial] = useState(true);
  const value = useRecoilValue(recoilState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return isInitial ? defaultValue : value;
}
