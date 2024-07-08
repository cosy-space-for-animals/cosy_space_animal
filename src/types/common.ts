import type { Dispatch, SetStateAction } from 'react';
import { SetRecoilState } from 'recoil';

export interface IIconProps {
  color?: string;
  size?: number;
}

export interface IInputItemProps {
  value: string;
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
