'use client';

import { css } from '@emotion/react';

interface ISegmentedButtonProps {
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  children: React.ReactNode;
}

export default function SegmentedButton(
  {
    name,
    id,
    onChange,
    checked = false,
    children,
  }: ISegmentedButtonProps) {
  return (
    <label
      htmlFor={`${id}-checkbox`}
      data-checked={checked}
      css={css`
        width: 128px;
        height: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--grey-700);
        border-radius: 6px;
        outline: none;
        font-size: 1rem;
        font-weight: 600;
        line-height: 1rem;
        letter-spacing: -0.25px;
        color: var(--grey-700);
        background: var(--grey-0);
        cursor: pointer;

        &:hover {
          background: #1717170d;
        }

        &[data-checked='true'] {
          background: var(--grey-700);
          color: var(--grey-0);
        }
      `}
    >
      <input
        type="checkbox"
        id={`${id}-checkbox`}
        css={css`
          display: none;
        `}
        name={name}
        onChange={(e) => {
          onChange(e);
        }}
        checked={checked}
      />
      {children}
    </label>
  );
}
