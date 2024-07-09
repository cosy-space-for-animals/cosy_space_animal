import React, { PropsWithChildren } from 'react';
import { IIconProps } from '@/types/common';
import OvalHorizontalThumb from '@/assets/frames/thumb/OvalHorizontalThumb';
import OvalVerticalThumb from '@/assets/frames/thumb/OvalVerticalThumb';
import CircleThumb from '@/assets/frames/thumb/CircleThumb';
import RectangleVerticalThumb from '@/assets/frames/thumb/RectangleVerticalThumb';
import RectangleHorizontalThumb from '@/assets/frames/thumb/RectangleHorizontalThumb';
import SquareThumb from '@/assets/frames/thumb/SquareThumb';
import DiamondThumb from '@/assets/frames/thumb/DiamondThumb';
import CloverThumb from '@/assets/frames/thumb/CloverThumb';
import HeartThumb from '@/assets/frames/thumb/HeartThumb';
import Blob1Thumb from '@/assets/frames/thumb/Blob1Thumb';
import Blob2Thumb from '@/assets/frames/thumb/Blob2Thumb';
import Blob3Thumb from '@/assets/frames/thumb/Blob3Thumb';
import Blob4Thumb from '@/assets/frames/thumb/Blob4Thumb';

const Thumbs = ({ children }:PropsWithChildren<IIconProps>) => {
  return (
    <>
      {children}
    </>
  );
};

Thumbs.oval_vertical = OvalVerticalThumb;
Thumbs.oval_horizontal = OvalHorizontalThumb;
Thumbs.circle = CircleThumb;
Thumbs.rectangle_vertical = RectangleVerticalThumb;
Thumbs.rectangle_horizontal = RectangleHorizontalThumb;
Thumbs.square = SquareThumb;
Thumbs.diamond = DiamondThumb;
Thumbs.clover = CloverThumb;
Thumbs.heart = HeartThumb;
Thumbs.blob_1 = Blob1Thumb;
Thumbs.blob_2 = Blob2Thumb;
Thumbs.blob_3 = Blob3Thumb;
Thumbs.blob_4 = Blob4Thumb;

export default Thumbs;
