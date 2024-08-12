'use client';

import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import BannerImage from '@/assets/images/slideBanner.png';
import BannerImage2 from '@/assets/images/slideBanner2.png';
import BannerTags from '@/assets/images/slideBannerTags.png';

export type RollingScrollBannerProps = React.HTMLAttributes<HTMLDivElement> & {
  isMobile?: boolean;
  children?: React.ReactNode;
}

const RollingScrollBanner = ({ children, isMobile, ...rest }: RollingScrollBannerProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContentsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  // rolling animation
  useEffect(() => {
    if (!containerRef.current || !imageContentsRef.current || !imageRef.current) return;

    const imageContents: HTMLDivElement[] = imageContentsRef.current;
    const imageWidth: number = imageRef.current.getBoundingClientRect().width;

    imageContents.forEach((el) => {
      el.style.width = `${imageWidth}px`;
    });

    const duration = 10;

    let left = 0;
    let intervalId: number | null = null;

    const animate = (): void => {
      left -= 1;
      if (left <= -imageWidth) {
        left = 0;
      }
      imageContents.forEach((el) => {
        el.style.transform = `translateX(${left}px)`;
      });
    };

    const startAnimation = () => {
      intervalId = window.setInterval(animate, duration);
    };

    startAnimation();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div
      css={css`
        overflow: hidden;
        width: 100%;
        position: relative;
      `}
      onMouseEnter={() => !isMobile && setIsHover(true)}
      onMouseLeave={() => !isMobile && setIsHover(false)}
      ref={containerRef}
      {...rest}
    >
      <div
        css={css`
          height: 100%;
          position: relative;
          display: flex;
          width: fit-content;
          flex-wrap: nowrap;
        `}
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            css={css`
              position: relative;
              flex-shrink: 0;
              height: 100%;
            `}
            key={index}
            ref={(el) => {
              if (el) {
                imageContentsRef.current.push(el);
              }
            }}
          >
            <Image
              css={css`
                height: 100%;
                width: auto;
                position: absolute;
              `}
              src={isHover ? BannerImage2 : BannerImage}
              ref={imageRef}
              alt="banner"
              priority={true}
            />
            <Image
              css={css`
                height: 100%;
                width: auto;
                position: absolute;
              `}
              src={BannerTags}
              alt="banner"
              priority={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingScrollBanner;
