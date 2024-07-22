import '@emotion/react';
import { ThemeType } from '@/types/theme';

type RGB = `rgb(${number},${number},${number})`;
type RGBA = `rgba(${number},${number},${number},${number})`;
type HEX = `#${string}`;
type HSL = `hsl(${number},${number}%,${number}%)`;
type HSLA = `hsla(${number},${number}%,${number}%,${number})`;
type VAR = `var(${string})`;

type TColor = RGB | RGBA | HEX | HSL | HSLA | VAR;

// 공통 타입 정의
type TColorMap = {
  [key: string]: TColor;
};

type TFontSizeMap = {
  xs: string | number,
  sm: string | number,
  ls: string | number,
  md: string | number,
  base: string | number,
  lg: string | number,
  xl: string | number,
  '2xl': string | number,
  '3xl': string | number,
  '4xl': string | number,
  '5xl': string | number,
  '6xl': string | number,
  '7xl': string | number,
  '8xl': string | number,
  '9xl': string | number,
};

type TKeyframes = {
  rotation: Record<string, { transform: string }>,
  slideDown: {
    from: { height: string | number; overflow: string },
    to: { height: string | number; overflow: string },
  },
  slideUp: {
    from: { height: string | number; overflow: string },
    to: { height: string | number; overflow: string },
  },
  fadeDown: {
    from: { opacity: number; transform: string },
    to: { opacity: number; transform: string },
  },
};

declare module '@emotion/react' {
  export interface Theme extends ThemeType {
    colors: {
      [key: string]: TColorMap;
    },
    statusColors: TColorMap,
    backgroundColors: TColorMap,
    fontFamily: {
      [key: string]: string;
    },
    fontSizes: TFontSizeMap,
    fontWeights: {
      normal: number,
      medium: number,
      semibold: number,
      bold: number,
    },
    keyframes: TKeyframes,
    device: {
      mobile: string,
    },
  }
}
