import type { Dispatch, SetStateAction } from 'react';
import { SetRecoilState } from 'recoil';

export interface IIconProps {
  color?: string;
  size?: number;
}

export interface IInputItemProps {
  id?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>> | ((e: string) => void);
  validate: boolean;
  errorMessage?: string;
  disabled?: boolean;
  placeholder?: string;
}
export interface IInputItemProps2 {
  id: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>> | ((e: string) => void);
  validate: (arg: string) => boolean | Promise<boolean>;
  errorMessage?: string;
  disabled?: boolean;
  placeholder?: string;
  onBlur?: () => void;
  submit?: () => void;
  setError?: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}
