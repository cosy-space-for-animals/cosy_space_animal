'use client';

import { IInputItemProps, TTextareaProps } from '@/types/common';
import { css } from '@emotion/react';
import Image from 'next/image';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';

const InputCharacterCounterItem = ({
                                     value,
                                     setValue,
                                     validate,
                                     errorMessage,
                                     maxLength,
                                     disabled = false,
                                     placeholder,
                                   }: TTextareaProps) => {
  const [count, setCount] = useState(value.length);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setCount(e.target.value.length);
  };

  const calculateRows = (value: string) => {
    const textarea = textareaRef.current;
    const hiddenTextarea = hiddenTextareaRef.current;

    if (textarea && hiddenTextarea) {
      hiddenTextarea.value = value;
      hiddenTextarea.style.height = 'auto';

      textarea.style.height = `${hiddenTextarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (hiddenTextareaRef.current && textareaRef.current) {
      hiddenTextareaRef.current.value = textareaRef.current.value;
      calculateRows(textareaRef.current.value);
    }
  }, [count]);

  useEffect(() => {
    setCount(value.length);
  }, [value]);

  return (
    <>
      <div
        css={css`
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        `}
      >
        <textarea
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          maxLength={maxLength}
          ref={textareaRef}
          css={css`
            width: 100%;
            resize: none;
            min-height: 52px;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: -0.5px;
            outline: none;
            padding: 14px 12px;
            border: 1px solid ${!validate && errorMessage ? 'var(--main-red-500)' : 'var(--grey-700)'};
            border-radius: 6px;
            max-height: 100px;

            &:focus {
              border: 1px solid var(--main-red-500);
            }

            &::placeholder {
              color: var(--grey-400);
            }

            &:disabled {
              opacity: 50%;
              background: var(--grey-0);
            }
          `}
        />
        <textarea
          name="hidden"
          id="hidden-textarea"
          css={css`
            width: 100%;
            position: absolute;
            top: -9999px;
            left: -9999px;
            resize: none;
            min-height: 52px;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: -0.5px;
            outline: none;
            padding: 14px 12px;
            border: 1px solid black;
            border-radius: 6px;
          `}
          ref={hiddenTextareaRef}
        />
        <span
          css={css`
            color: var(--danger);
            font-size: 13px;
            font-weight: 400;
            line-height: 19.5px;
            letter-spacing: -0.25px;
          `}
        >
          {count}/90
        </span>
      </div>

      <div
        css={css`
          margin-top: 4px;
          display: flex;
          justify-content: ${!validate && errorMessage ? 'space-between' : 'flex-end'};
          align-items: center;
        `}
      >
        {!validate && errorMessage && (
          <span
            css={css`
              display: flex;
              gap: 4px;
              align-items: center;
              color: var(--danger);
              font-size: 13px;
              font-weight: 400;
              line-height: 19.5px;
              letter-spacing: -0.25px;
              white-space: nowrap;
              overflow: hidden;
            `}
          >
            <Image
              src="/icon-error.svg"
              width={16}
              height={16}
              alt="icon-error"
            />
            {errorMessage}
          </span>
        )}
      </div>
    </>
  );
};

export default InputCharacterCounterItem;
