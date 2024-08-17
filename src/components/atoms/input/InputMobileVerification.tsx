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
import Toast from '../Toast';
import { restrictToNumbers } from '@/utils/common';
import fetchWrapper from '@/utils/fetch/fetchWrapper';

const InputMobileVerification: React.FC<any> = ({
  id,
  value,
  setValue,
  disabled = false,
  setVerificationResult,
}) => {
  const theme = useTheme();

  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);
  const [canRequest, setCanRequest] = useState(false);
  const [verification, setVerification] = useState(false);

  const [code, setCode] = useState('');
  const [focus2, setFocus2] = useState(false);
  const [value2, setValue2] = useState<string | undefined>(undefined);
  const [error2, setError2] = useState(false);
  const [status2, setStatus2] = useState<
    'success' | 'failure' | 'invalid' | undefined
  >(undefined);
  const [toast2, setToast2] = useState(false);

  const mouseDownHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => e.preventDefault(),
    [],
  );
  const onFocus = useCallback(() => setFocus(true), []);
  const onBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocus(false);
      setError(!e.target.value);
    },
    [setFocus, setError],
  );
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(restrictToNumbers(e.target.value).slice(0, 11));
      onFocus();
    },
    [onFocus, setValue],
  );
  const remove = useCallback(() => setValue(''), [setValue]);

  const onClick = useCallback(async () => {
    if (!verification) {
      try {
        const { data } = await fetchWrapper(
          `${process.env.NEXT_PUBLIC_API_URL}/send-sms?recipientPhone=${value}`,
        );
        setCode(data);
        setVerification(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setVerification(false);
      setValue2(undefined);
      setStatus2(undefined);
    }
  }, [verification, value]);

  const onFocus2 = useCallback(() => setFocus2(true), []);
  const onBlur2 = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocus2(false);
    },
    [setFocus2],
  );
  const onChange2 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue2(restrictToNumbers(e.target.value).slice(0, 6));
  }, []);
  const remove2 = useCallback(() => {
    setValue2('');
  }, [setValue2]);

  const onClick2 = useCallback(() => {
    setToast2(true);
  }, []);

  useEffect(() => {
    if (toast2) {
      const timer = setTimeout(() => {
        setToast2(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [toast2]);

  useEffect(() => {
    if (value.length === 11) {
      setCanRequest(true);
    } else {
      setCanRequest(false);
    }
  }, [value]);

  useEffect(() => {
    if (value2 === undefined) {
      setStatus2(undefined);
      setVerificationResult(false);
      return;
    }
    if (value2.length < 6) {
      setStatus2('invalid');
      setError2(true);
      setVerificationResult(false);
    } else {
      if (code === value2) {
        setError2(false);
        setStatus2('success');
        setVerificationResult(true);
      } else {
        setError2(true);
        setStatus2('failure');
        setVerificationResult(false);
      }
    }
  }, [value2, code, setVerificationResult]);

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
            placeholder='‘-’ 없이 숫자만 입력'
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
                ${error ? 'var(--main-red-500)' : 'var(--grey-700)'};
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
                id={id + ' verificationCode'}
                disabled={Boolean(status2 === 'success')}
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
                    ${error ? 'var(--main-red-500)' : 'var(--grey-700)'};
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
              {status2 !== 'success' && Boolean(value2) && focus2 && (
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
                  display: flex;
                  gap: 4px;
                `}
              >
                {toast2 && <Toast text='인증코드를 다시 보냈어요' />}
                <RoundButton
                  disabled={Boolean(status2 === 'success')}
                  type='filled'
                  onClick={onClick2}
                >
                  재요청
                </RoundButton>
              </div>
            </div>
          </label>
          {status2 && (
            <div
              css={css`
                margin-top: 4px;
                display: flex;
                gap: 4px;
                align-items: center;
                color: ${error2
                  ? theme.statusColors.danger
                  : theme.statusColors.success};
                font-size: 13px;
                font-weight: 400;
                line-height: 19.5px;
                letter-spacing: -0.25px;
              `}
            >
              <Image
                src={error2 ? '/icon-error.svg' : '/icon-success.svg'}
                width={16}
                height={16}
                alt='icon-error'
              />
              {status2 === 'failure' && '인증번호가 일치하지 않습니다.'}
              {status2 === 'success' && '인증번호가 일치해요!'}
              {status2 === 'invalid' && '인증번호 6자리를 입력해주세요.'}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InputMobileVerification;
