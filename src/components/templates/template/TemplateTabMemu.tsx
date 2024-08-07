import ProfileTabItem from '@/components/atoms/buttons/ProfileTabItem';
import { Nullable } from '@/types/global';
import { css, useTheme } from '@emotion/react';
import { Dispatch, SetStateAction, useState } from 'react';

const TAB_ITEMS = [
  { id: 1, name: '모든 추억', amount: 115 },
  { id: 2, name: '따뜻한 한마디', amount: 47 },
  { id: 3, name: '소개' },
];

interface IProps {
  selectedTabId: Nullable<number>;
  setSelectedTabId: Dispatch<SetStateAction<Nullable<number>>>;
}

const TemplateTabMemu = ({ selectedTabId, setSelectedTabId }: IProps) => {
  const theme = useTheme();
  return (
    <ul
      css={css`
        display: flex;
        background: ${theme.colors.grey[0]};
        li {
          width: 100%;
        }
      `}
    >
      {TAB_ITEMS.map((v) => (
        <li>
          <ProfileTabItem
            data={v}
            selected={selectedTabId}
            setSelected={setSelectedTabId}
          />
        </li>
      ))}
    </ul>
  );
};

export default TemplateTabMemu;
