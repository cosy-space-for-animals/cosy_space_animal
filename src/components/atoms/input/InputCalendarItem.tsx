import { IInputItemProps, TOverride } from '@/types/common';
import { css } from '@emotion/react';
import Image from 'next/image';
import { type MouseEvent, type ChangeEvent, useEffect, useState } from 'react';
import { formatDate } from '@/utils/common';

const InputCalendarItem = ({
  value,
  setValue,
  validate,
  errorMessage,
  disabled = false,
}: IInputItemProps) => {
  const [focus, setFocus] = useState(false);

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  const preventEventHandler = (e: MouseEvent<HTMLElement>) =>
    e.preventDefault();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(formatDate(e.target.value, 'YYYY-MM-DD'));
    onFocus();
  };

  return (
    <>
      <div
        css={css`
          position: relative;
          width: 100%;
        `}
      >
        <input
          id='date'
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          type='date'
          css={css`
            width: 100%;
            height: 52px;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: -0.5px;
            outline: none;
            padding: 14px ${Boolean(value)
              ? focus
                ? '76px'
                : '44px'
              : '12px'} 14px 12px;
            border: 1px solid ${!validate && errorMessage ? 'var(--main-red-500)' : 'var(--grey-700)'};
            border-radius: 6px;
            color: ${value ? 'var(--grey-900)' : 'var(--grey-400)'};

            &:focus {
              border: 1px solid var(--main-red-500);
            }

            &:disabled {
              opacity: 50%;
              background: var(--grey-0);
            }

            &::-webkit-calendar-picker-indicator {
              width: auto;
              height: auto;
              background: transparent;
              color: transparent;
              cursor: pointer;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }
          `}
        />
        {Boolean(value) && focus && (
          <button
            type='button'
            onMouseDown={preventEventHandler}
            onClick={() => {
              setValue('');
              onBlur();
            }}
            css={css`
              position: absolute;
              top: 14px;
              right: 44px;
            `}
          >
            <Image
              src='/button-delete.svg'
              width={24}
              height={24}
              alt='delete-button'
            />
          </button>
        )}
        <button
          disabled={disabled}
          type='button'
          css={css`
            position: absolute;
            right: 12px;
            top: 14px;
            pointer-events: none;
            &:disabled {
              opacity: 50%;
            }
          `}
        >
          <Image src='/icon-calendar.svg' width={24} height={24} alt='icon' />
        </button>
      </div>

      {(!validate && errorMessage) && (
        <div
          css={css`
            margin-top: 4px;
            display: flex;
            gap: 4px;
            align-items: center;
            color: var(--danger);
            font-size: 13px;
            font-weight: 400;
            line-height: 19.5px;
            letter-spacing: -0.25px;
          `}
        >
          <Image
            src='/icon-error.svg'
            width={16}
            height={16}
            alt='icon-error'
          />
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default InputCalendarItem;
