import type { Dispatch, SetStateAction } from 'react';
import { SetRecoilState } from 'recoil';

export interface IIconProps {
  color?: string;
  size?: number;
}

export interface IInputItemProps {
  value: string | number;
  setValue: Dispatch<SetStateAction<string>> | ((e: string) => void);
  validate: boolean;
  errorMessage?: string;
  disabled?: boolean;
  placeholder?: string;
}

export type TOverride<T, U> = Omit<T, keyof U> & U;
