import { Theme } from '@emotion/react';

type RGB = `rgb(${number},${number},${number})`;
type RGBA = `rgba(${number},${number},${number},${number})`;
type HEX = `#${string}`;
type HSL = `hsl(${number},${number}%,${number}%)`;
type HSLA = `hsla(${number},${number}%,${number}%,${number})`;
type VAR = `var(${string})`;

export type TColor = RGB | RGBA | HEX | HSL | HSLA | VAR;

export const theme: Theme = {
  colors: {
    primary: {
      0: '#ffffff',
      50: '#ffedea',
      100: '#fcdcd7',
      200: '#fab9b1',
      300: '#f69888',
      400: '#f47460',
      500: '#f15139',
      600: '#c2412e',
      700: '#913121',
      800: '#612017',
      900: '#30100a',
    },
    secondary: {
      yellow: '#ffd223',
      sky: '#8ccaff',
      green: '#73e390',
      pink: '#ff91b9',
      purple: '#c7a5ff',
    },
    grey: {
      0: '#ffffff',
      50: '#fafafa',
      100: '#f2f2f2',
      200: '#e6e6e6',
      300: '#d4d4d4',
      400: '#b3b3b3',
      500: '#949494',
      600: '#757575',
      700: '#525252',
      800: '#333333',
      900: '#171717',
    },
  },
  statusColors: {
    success: '#56bc44',
    danger: '#e43333',
    warning: '#f1b419',
    info: '#129eed',
  },
  backgroundColors: {
    default: '#f7f5f1',
    surface: '#ffffff',
  },
  fontFamily: {
    body: '\'Pretendard GOV Variable\'',
  },
  fontSizes: {
    xs: 11,
    sm: 12,
    ls: 13,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 40,
    '7xl': 48,
    '8xl': 56,
    '9xl': 64,
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  keyframes: {
    rotation: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    slideDown: {
      from: { height: 0, overflow: 'hidden'},
      to: { height: '52px', overflow: 'visible' },
    },
    slideUp: {
      from: { height: '52px', overflow: 'hidden' },
      to: { height: 0, overflow: 'hidden' },
    },
  },
  device: {
    mobile: 'screen and (max-width: 768px)',
  },
};

export type ThemeType = typeof theme;
