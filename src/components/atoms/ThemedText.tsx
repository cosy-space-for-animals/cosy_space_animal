import React from 'react';
import { css, useTheme } from '@emotion/react';

export interface ThemedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  cssStyle?: ReturnType<typeof css>;
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'displayLarge' | 'displayMedium' | 'displaySmall' |
    'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' |
    'subtitleXLarge' | 'subtitleLarge' | 'subtitleMedium' | 'subtitleSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' |
    'labelLarge' | 'labelMedium' | 'labelSmall' | 'captionLarge' | 'captionMedium' | 'captionSmall' |
    'buttonLarge' | 'buttonMedium' | 'buttonSmall';
}

const ThemedText = ({
  cssStyle,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
  }: ThemedTextProps) => {
  const theme = useTheme();

  return (
    <span
      css={css`
        word-break: keep-all;
        color: ${lightColor};
        ${type === 'default' ? `font-size: ${theme.fontSizes['base']}px` : ''}
        ${type === 'displayLarge' ? `font-size: ${theme.fontSizes['9xl']}px; line-height: 120%; font-weight: ${theme.fontWeights.medium};` : ''}
        ${type === 'displayMedium' ? `font-size: ${theme.fontSizes['8xl']}px; line-height: 120%; font-weight: ${theme.fontWeights.medium};` : ''}
        ${type === 'displaySmall' ? `font-size: ${theme.fontSizes['7xl']}px; line-height: 120%; font-weight: ${theme.fontWeights.bold};` : ''}
        ${type === 'headlineLarge' ? `font-size: ${theme.fontSizes['6xl']}px; line-height: 120%; font-weight: ${theme.fontWeights.medium};` : ''}
        ${type === 'headlineMedium' ? `font-size: ${theme.fontSizes['5xl']}px; line-height: 120%; font-weight: ${theme.fontWeights.bold};` : ''}
        ${type === 'headlineSmall' ? `font-size: ${theme.fontSizes['4xl']}px; line-height: 120%; font-weight: ${theme.fontWeights.bold};` : ''}
        ${type === 'titleLarge' ? `font-size: ${theme.fontSizes['3xl']}px; line-height:130%; font-weight: ${theme.fontWeights.medium};` : ''}
        ${type === 'titleMedium' ? `font-size: ${theme.fontSizes['2xl']}px; line-height:130%; font-weight: ${theme.fontWeights.bold};` : ''}
        ${type === 'titleSmall' ? `font-size: ${theme.fontSizes['xl']}px; line-height:130%; font-weight: ${theme.fontWeights.bold};` : ''}
        ${type === 'subtitleXLarge' ? `font-size: ${theme.fontSizes['2xl']}px; line-height:130%; font-weight: ${theme.fontWeights.semibold};` : ''}
        ${type === 'subtitleLarge' ? `font-size: ${theme.fontSizes['xl']}px; line-height:130%; font-weight: ${theme.fontWeights.semibold};` : ''}
        ${type === 'subtitleMedium' ? `font-size: ${theme.fontSizes['lg']}px; line-height:130%; font-weight: ${theme.fontWeights.bold};` : ''}
        ${type === 'subtitleSmall' ? `font-size: ${theme.fontSizes['base']}px; line-height:130%; font-weight: ${theme.fontWeights.bold};` : ''}
        ${type === 'bodyLarge' ? `font-size: ${theme.fontSizes['lg']}px; line-height:150%; font-weight: ${theme.fontWeights.normal};` : ''}
        ${type === 'bodyMedium' ? `font-size: ${theme.fontSizes['base']}px; line-height:150%; font-weight: ${theme.fontWeights.normal};` : ''}
        ${type === 'bodySmall' ? `font-size: ${theme.fontSizes['md']}px; line-height:150%; font-weight: ${theme.fontWeights.normal};` : ''}
        ${type === 'labelLarge' ? `font-size: ${theme.fontSizes['base']}px; line-height:150%; font-weight: ${theme.fontWeights.medium};` : ''}
        ${type === 'labelMedium' ? `font-size: ${theme.fontSizes['md']}px; line-height:150%; font-weight: ${theme.fontWeights.medium};` : ''}
        ${type === 'labelSmall' ? `font-size: ${theme.fontSizes['sm']}px; line-height:150%; font-weight: ${theme.fontWeights.medium};` : ''}
        ${type === 'buttonLarge' ? `font-size: ${theme.fontSizes['lg']}px; line-height:100%; font-weight: ${theme.fontWeights.semibold};` : ''}
        ${type === 'buttonMedium' ? `font-size: ${theme.fontSizes['base']}px; line-height:100%; font-weight: ${theme.fontWeights.semibold};` : ''}
        ${type === 'buttonSmall' ? `font-size: ${theme.fontSizes['md']}px; line-height:100%; font-weight: ${theme.fontWeights.semibold};` : ''}
        ${type === 'captionLarge' ? `font-size: ${theme.fontSizes['ls']}px; line-height:150%; font-weight: ${theme.fontWeights.normal};` : ''}
        ${type === 'captionMedium' ? `font-size: ${theme.fontSizes['sm']}px; line-height:150%; font-weight: ${theme.fontWeights.normal};` : ''}
        ${type === 'captionSmall' ? `font-size: ${theme.fontSizes['xs']}px; line-height:150%; font-weight: ${theme.fontWeights.normal};` : ''}
        ${cssStyle}
      `}
      {...rest}
    />
  );
};

export default ThemedText;
