import React from 'react';
import { IIconProps } from '@/types/common';

const Blob2Thumb = ({color}:IIconProps) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M6.6374 2.1468C8.18435 2.11119 9.48322 0.198646 10.9312 0.734207C12.3272 1.25053 12.5596 3.10712 13.0092 4.50348C13.4552 5.88841 14.3163 7.51178 13.5048 8.72635C12.6697 9.97634 10.5339 9.25895 9.27264 10.0965C8.08847 10.8829 8.01987 12.9292 6.6374 13.2868C5.25807 13.6436 3.89973 12.6171 2.75424 11.7827C1.61854 10.9554 0.441109 9.95834 0.192135 8.5917C-0.0475351 7.27613 1.1158 6.17933 1.49985 4.89716C1.90098 3.55793 1.23903 1.59691 2.48744 0.928581C3.78684 0.23295 5.15774 2.18086 6.6374 2.1468Z"
            fill={color} />
    </svg>
  );
};

export default Blob2Thumb;
