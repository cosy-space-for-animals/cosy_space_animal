import { IInputItemProps2 } from '@/types/common';
import { css } from '@emotion/react';
import Image from 'next/image';
import {
  type MouseEvent,
  type ChangeEvent,
  useState,
  type FocusEvent,
  useEffect,
} from 'react';

const InputDefaultItem: React.FC<IInputItemProps2> = ({
  id,
  value,
  setValue,
  validate,
  errorMessage,
  placeholder,
  disabled = false,
}) => {
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

  const onFocus = () => setFocus(true);
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    setError(!validate(e.target.value));
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onFocus();
  };
  const remove = () => setValue('');
  const mouseDownHandler = (e: MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();

  return (
    <>
      <div
        css={css`
          position: relative;
          width: 100%;
        `}
      >
        <input
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          type='text'
          css={css`
            width: 100%;
            height: 52px;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: -0.5px;
            outline: none;
            padding: 14px 12px;
            padding-right: ${focus ? '46px' : '12px'};
            border: 1px solid
              ${error && errorMessage
                ? 'var(--main-red-500)'
                : 'var(--grey-700)'};
            border-radius: 6px;
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
        {Boolean(value) && focus && (
          <button
            type='button'
            onMouseDown={mouseDownHandler}
            onClick={remove}
            css={css`
              position: absolute;
              top: 14px;
              right: 12px;
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
      </div>
      {error && errorMessage && (
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

export default InputDefaultItem;
