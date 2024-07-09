import { IInputItemProps2 } from '@/types/common';
import { css } from '@emotion/react';
import Image from 'next/image';
import {
  type MouseEvent,
  type ChangeEvent,
  useState,
  type FocusEvent,
  useCallback,
  useEffect,
} from 'react';
import RoundButton from '../buttons/RoundButton';

const InputMobileVerification: React.FC<any> = ({
  id,
  value,
  code,
  setValue,
  validate,
  errorMessage,
  placeholder,
  disabled = false,
}) => {
  const [canGoNext, setCanGoNext] = useState(false);
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

  const checkOnlyNumbers = useCallback((string: string): string => {
    return string.replace(/[^0-9]/g, '');
  }, []);
  const mouseDownHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => e.preventDefault(),
    [],
  );
  const onFocus = useCallback(() => setFocus(true), []);
  const onBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocus(false);
      setError(!validate(e.target.value));
    },
    [setFocus, setError, validate],
  );
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(checkOnlyNumbers(e.target.value).slice(0, 11));
      onFocus();
    },
    [onFocus, setValue, checkOnlyNumbers],
  );
  const remove = useCallback(() => setValue(''), [setValue]);
  const request = useCallback(() => {
    console.log('통신성공');
    // 번호수정을 눌러야 포커스 => Input focus 빼기
    // 인증번호 Input active되면서 나타남, focus도 됨
  }, []);

  useEffect(() => {
    if (value.length === 11) {
      setCanGoNext(true);
    } else {
      setCanGoNext(false);
    }
  }, [value]);

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
          type='tel'
          inputMode='numeric'
          maxLength={11}
          css={css`
            width: 100%;
            height: 52px;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: -0.5px;
            outline: none;
            padding: 14px 12px;
            padding-right: ${focus ? '134px' : '103px'};
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
              right: 103px;
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
        <div
          css={css`
            position: absolute;
            top: 10px;
            right: 12px;
          `}
        >
          <RoundButton disabled={!canGoNext} type='filled' onClick={request}>
            인증 요청
          </RoundButton>
        </div>
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

export default InputMobileVerification;
