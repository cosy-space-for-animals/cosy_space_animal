'use client';

import { ReactNode, useMemo } from 'react';
import { css } from '@emotion/react';

const extractPath = (svgString) => {
  try {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
    const pathElement = svgDoc.querySelector('path');
    switch (svgDoc.children[0].children[0].tagName) {
      case 'path':
        return (
          <path d={pathElement?.getAttribute('d') || ''} />
        );
      case 'rect':
        return (
          <rect
            x={svgDoc.children[0].children[0].getAttribute('x') || ''}
            y={svgDoc.children[0].children[0].getAttribute('y') || ''}
            width={svgDoc.children[0].children[0].getAttribute('width') || ''}
            height={svgDoc.children[0].children[0].getAttribute('height') || ''}
          />
        );
      case 'circle':
        return (
          <circle
            cx={svgDoc.children[0].children[0].getAttribute('cx') || ''}
            cy={svgDoc.children[0].children[0].getAttribute('cy') || ''}
            r={svgDoc.children[0].children[0].getAttribute('r') || ''}
          />
        );
      case 'ellipse':
        return (
          <ellipse
            cx={svgDoc.children[0].children[0].getAttribute('cx') || ''}
            cy={svgDoc.children[0].children[0].getAttribute('cy') || ''}
            rx={svgDoc.children[0].children[0].getAttribute('rx') || ''}
            ry={svgDoc.children[0].children[0].getAttribute('ry') || ''}
          />
        );
      default:
        return null;
    }
  } catch (error) {
    console.error('Error parsing SVG shape:', error);
    return null;
  }
};

type Props = {
  svgShape: string;
  renderedImage: ReactNode;
  width?: number;
  height?: number;
  maskId?: string;
};


const ImageMask = (
  {
    svgShape,
    renderedImage,
    width = 0,
    height = 0,
    maskId = 'mask',
  }: Props) => {
  const pathString = useMemo(() => {
    if (!svgShape) {
      console.error('No SVG shape provided');
      return;
    }

    const path = extractPath(svgShape);
    if (path) {
      return path;
    } else {
      console.error('Failed to extract path from SVG shape');
    }
  }, [svgShape]);

  if (!pathString) {
    return null;
  }

  return (
    <div css={css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}>
      <svg width={width} height={height}>
        <defs>
          <clipPath id={maskId}>
            {extractPath(svgShape)}
          </clipPath>
        </defs>
      </svg>
      {renderedImage}
    </div>
  );
};

export default ImageMask;
