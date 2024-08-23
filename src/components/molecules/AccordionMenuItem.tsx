import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { css, useTheme } from '@emotion/react';
import type { Nullable } from '@/types/global';
import ArrowDropdownIcon from '@/assets/icon/ArrowDropdownIcon';
import ArrowDropdownUpIcon from '@/assets/icon/ArrowDropdownUpIcon';
import CheckboxButton from '@/components/atoms/buttons/CheckboxButton';

export type TAccordionMenuItem = {
  id: number;
  title: string;
  desc: Nullable<string>;
  required: boolean;
};

interface IAccordionMenuItemProps {
  title?: string;
  data: TAccordionMenuItem;
  selected: Set<number>;
  setSelected: Dispatch<SetStateAction<Set<number>>>;
}

export default function AccordionMenuItem({
  title,
  data,
  selected,
  setSelected,
}: IAccordionMenuItemProps) {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  function select() {
    const set = new Set(selected);
    if (isSelected) {
      set.delete(data.id);
      setSelected(set);
    } else {
      set.add(data.id);
      setSelected(set);
    }
  }

  useEffect(() => {
    const set = new Set(selected);
    setIsSelected(set.has(data.id));
  }, [data.id, selected]);

  return (
    <div
      css={css`
        padding: 20px;
        &:not(:first-of-type) {
          padding-top: 0;
        }
        font-weight: 400;
        letter-spacing: -0.25px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        `}
      >
        <CheckboxButton selected={isSelected} onClick={select} />
        <div
          onClick={() => setToggle((prev) => !prev)}
          css={css`
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            font-size: 1rem;
            line-height: 24px;
            color: ${theme.colors.grey[900]};
          `}
        >
          <span>{title || data.title}</span>
          {data.desc && (
            <>
              {toggle ? (
                <ArrowDropdownUpIcon color={theme.colors.grey[500]} />
              ) : (
                <ArrowDropdownIcon color={theme.colors.grey[500]} />
              )}
            </>
          )}
        </div>
      </div>
      {data.desc && (
        <div
          css={css`
            @keyframes slideout {
              from {
                max-height: 0;
              }
              to {
                max-height: 160px;
              }
            }
            animation: slideout 0.3s;
            display: ${toggle ? 'block' : 'none'};
            transform-origin: top center;
            background: ${theme.colors.grey[100]};
            margin-top: 8px;
            padding: 12px;
            font-size: 13px;
            line-height: 19.5px;
            color: ${theme.colors.grey[700]};
            max-height: 160px;
            overflow-y: scroll;
            white-space: pre-wrap;
          `}
        >
          {data.desc}
        </div>
      )}
    </div>
  );
}
