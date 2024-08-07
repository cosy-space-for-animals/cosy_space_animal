import type { Nullable } from '@/types/global';
import type { Dispatch, SetStateAction } from 'react';
import { css } from '@emotion/react';

export type ProfileTabItemData = {
  id: number;
  name: string;
  amount?: number;
  [key: string]: any;
};

interface IProfileTabItemProps {
  data: ProfileTabItemData;
  selected: Nullable<number>;
  setSelected: Dispatch<SetStateAction<Nullable<number>>>;
}

export default function ProfileTabItem({
  data,
  selected,
  setSelected,
}: IProfileTabItemProps) {
  const isSelected = Boolean(selected === data?.id);

  function select() {
    setSelected(data.id);
  }

  return (
    <div
      onClick={select}
      css={css([
        `
          padding: 11px 0;
          border-bottom: 2px solid var(--grey-900);
          display: flex;
          align-items: center;
          gap: 2px;
          letter-spacing: -0.25px;
          display: flex;
          justify-content: center;
          height: 40px;
        `,
        !isSelected &&
          css`
            border-bottom: 1px solid var(--grey-400);
          `,
      ])}
    >
      <span
        css={css([
          css`
            font-weight: 600;
            font-size: 1rem;
            line-height: 1rem;
            color: var(--grey-900);
          `,
          !isSelected &&
            css`
              color: var(--grey-400);
            `,
        ])}
      >
        {data.name}
      </span>
      {data.amount ? (
        <span
          css={css([
            css`
              font-weight: 500;
              font-size: 12px;
              line-height: 18px;
              color: var(--main-red-500);
            `,
            !isSelected &&
              css`
                color: var(--grey-400);
              `,
          ])}
        >
          {data.amount}
        </span>
      ) : null}
    </div>
  );
}
