import { IInputItemProps2 } from '@/types/common';
import { css, useTheme } from '@emotion/react';
import Image from 'next/image';
import {
  type MouseEvent,
  type ChangeEvent,
  useState,
  type FocusEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import RoundButton from '../buttons/RoundButton';
import InputDefaultItem from './InputDefaultItem';
import { Nullable } from '@/types/global';

const InputMobileVerification: React.FC<any> = ({
  id,
  value,
  setValue,
  validate,
  errorMessage,
  placeholder,
  disabled = false,
}) => {
  const theme = useTheme();

  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const verificationInputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);
  const [canRequest, setCanRequest] = useState(false);
  const [verification, setVerification] = useState(false);

  const [focus2, setFocus2] = useState(false);
  const [value2, setValue2] = useState<Nullable<string>>(null);
  const [error2, setError2] = useState(false);
  const [message2, setMessage2] = useState('');

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

  const onFocus2 = useCallback(() => setFocus2(true), []);
  const onBlur2 = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocus2(false);
    },
    [setFocus2],
  );
  const onChange2 = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue2(checkOnlyNumbers(e.target.value).slice(0, 6));
    },
    [checkOnlyNumbers],
  );
  const onClick = useCallback(() => {
    if (!verification) {
      console.log('통신성공');
      setVerification(true);
    } else {
      setVerification(false);
      setValue2('');
    }
  }, [verification]);

  const remove2 = useCallback(() => {
    setValue2('');
  }, [setValue2]);

  useEffect(() => {
    if (value.length === 11) {
      setCanRequest(true);
    } else {
      setCanRequest(false);
    }
  }, [value]);

  // TODO: active, ok 뜨면 다음 필드로

  useEffect(() => {
    if (value2 === null) return;

    if (value2.length < 6) {
      setMessage2('인증번호 6자리를 입력해주세요.');
      setError2(true);
    } else {
      if (true) {
        console.log('통신성공', value2);
        setMessage2('인증번호가 일치해요!');
        setError2(false);
      } else {
        console.log('통신실패', value2);
        setMessage2('인증번호가 일치하지 않습니다.');
        setError2(true);
      }
    }
  }, [value2]);

  return (
    <>
      <div>
        <div
          css={css`
            position: relative;
            width: 100%;
          `}
        >
          <input
            ref={phoneNumberInputRef}
            id={id}
            disabled={verification || disabled}
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
          <label
            css={css`
              position: absolute;
              top: 10px;
              right: 12px;
            `}
          >
            <RoundButton
              disabled={!canRequest}
              type={verification ? 'outline' : 'filled'}
              onClick={onClick}
            >
              {verification ? '번호 수정' : '인증 요청'}
            </RoundButton>
          </label>
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
      </div>
      {/* verification code */}
      {verification && (
        <div
          css={css`
            margin-top: 12px;
          `}
        >
          <label
            htmlFor='verificationCode'
            css={css`
              font-size: 13px;
              font-weight: 400;
              line-height: 19.5px;
              letter-spacing: -0.25px;
              color: ${theme.colors.grey[700]};
            `}
          >
            인증번호를 문자 메시지로 보냈어요!
            <div
              css={css`
                margin-top: 4px;
                position: relative;
                width: 100%;
              `}
            >
              <input
                id='verificationCode'
                disabled={disabled}
                placeholder='인증번호 6자리 입력'
                onFocus={onFocus2}
                onBlur={onBlur2}
                onChange={onChange2}
                value={value2}
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
              {Boolean(value2) && focus2 && (
                <button
                  type='button'
                  onMouseDown={mouseDownHandler}
                  onClick={remove2}
                  css={css`
                    position: absolute;
                    top: 14px;
                    right: 112px;
                    right: 88px;
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
                <RoundButton
                  disabled={true}
                  type='filled'
                  onClick={() => {
                    console.log('div');
                  }}
                >
                  재요청
                </RoundButton>
              </div>
            </div>
          </label>
          {error2 && message2 && (
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
              {message2}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InputMobileVerification;
