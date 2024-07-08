import { IInputItemProps, IInputItemProps2 } from '@/types/common';
import { css } from '@emotion/react';
import Image from 'next/image';
import { type MouseEvent, type ChangeEvent, useState, FocusEvent } from 'react';

const InputPasswordItem: React.FC<IInputItemProps2> = ({
  id,
  value,
  setValue,
  validate,
  errorMessage,
  disabled = false,
  placeholder,
}) => {
  const [focus, setFocus] = useState(false);
  const [inputType, setInputType] = useState<'password' | 'text'>('password');
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
  const preventEventHandler = (e: MouseEvent<HTMLElement>) =>
    e.preventDefault();
  const setInputTypeHandler = () => {
    if (disabled) return;
    setInputType((prev) => {
      if (prev === 'password') {
        return 'text';
      } else {
        return 'password';
      }
    });
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
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          type={inputType}
          css={css`
            width: 100%;
            height: 52px;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: -0.5px;
            outline: none;
            padding: 14px 12px;
            padding-right: ${Boolean(value)
              ? focus
                ? '76px'
                : '44px'
              : '12px'};
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
            onMouseDown={preventEventHandler}
            onClick={remove}
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
        {Boolean(value) && (
          <label
            htmlFor='input'
            onMouseDown={preventEventHandler}
            onClick={setInputTypeHandler}
            css={css(css`
              position: absolute;
              right: 12px;
              top: 14px;
            `)}
          >
            <Image
              src={`/icon-${inputType === 'password' ? 'show' : 'hide'}.svg`}
              width={24}
              height={24}
              alt='icon'
            />
          </label>
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

export default InputPasswordItem;
