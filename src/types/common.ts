import type { Dispatch, SetStateAction } from 'react';
import { SetRecoilState } from 'recoil';

export type TOverride<T, U> = Omit<T, keyof U> & U;

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

export interface IPopupProps {
  open: boolean;
  onClose: () => void;
}

export type TInputDateProps = TOverride<
  IInputItemProps,
  {
    value: string;
    deleteBtn?: boolean;
    min?: string | Date;
    max?: string | Date;
  }
>;

export type TTextareaProps = TOverride<
  IInputItemProps,
  {
    value: string;
    maxLength: number;
  }
>;

export type TUploadImageResponse = {
  url: string;
  key: string;
};

export type TFetchResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type TFetchError = {
  status: number;
  message: string;
};
