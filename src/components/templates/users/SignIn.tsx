import CheckButton from '@/components/atoms/buttons/CheckButton';
import MainButton from '@/components/atoms/buttons/MainButton';
import InputDefaultItem from '@/components/atoms/input/InputDefaultItem';
import InputPasswordItem from '@/components/atoms/input/InputPasswordItem';
import UserPopup from '@/components/molecules/users/userPopup';
import {
  getItemWithExpireDate,
  restrictToNumbers,
  setItemWithExpireDate,
  validateEmail,
  validatePassword,
} from '@/utils/common';
import { css, useTheme } from '@emotion/react';
import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { SignUp } from './SignUp';
import Image from 'next/image';
import RoundButton from '@/components/atoms/buttons/RoundButton';
import Toast from '@/components/atoms/Toast';
import fetchWrapper from '@/utils/fetchWrapper';
import NaverLogin from '@/components/organisms/user/NaverLogin';
import { useRouter } from 'next/router';

interface ISignUpProps {
  render: Dispatch<SetStateAction<boolean>>;
}

const UpdatePassword = ({ render, setComponent, component }) => {
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  function validatePasswordCheck() {
    return Boolean(password === passwordCheck);
  }

  function setButtonStatus() {
    return !(validatePassword(password) && validatePasswordCheck());
  }

  function submit() {
    setComponent('updateCompleted');
  }

  const isCompleted = Boolean(component === 'updateCompleted');
  if (isCompleted) {
    return (
      <div
        css={css`
          width: 280px;
        `}
      >
        <div
          css={css`
            font-size: 16px;
            font-weight: 700;
            line-height: 20.8px;
            letter-spacing: -0.5px;
            margin-bottom: 16px;
            color: ${theme.colors.grey[700]};
          `}
        >
          재설정한 비밀번호로
          <br /> 로그인 해주세요.
        </div>
        <div
          css={css`
            display: flex;
            justify-content: right;
            align-items: center;
            gap: 4px;
          `}
        >
          <RoundButton
            onClick={() => {
              render((prev) => !prev);
            }}
            type='outline'
          >
            닫기
          </RoundButton>
          <RoundButton
            onClick={() => {
              setComponent('singIn');
            }}
            type='filled'
          >
            로그인 하기
          </RoundButton>
        </div>
      </div>
    );
  }
  return (
    <div
      css={css`
        width: 320px;
      `}
    >
      {/* password */}
      <div
        css={css`
          margin-bottom: 24px;
        `}
      >
        <label
          htmlFor='password'
          css={css`
            font-size: 14px;
            font-weight: 500;
            line-height: 21px;
            letter-spacing: -0.25px;
          `}
        >
          비밀번호
          <div
            css={css`
              margin-top: 4px;
            `}
          >
            <InputPasswordItem
              id='password'
              value={password}
              setValue={setPassword}
              validate={validatePassword}
              errorMessage='영문, 숫자, 특수문자 혼합하여 8자 이상으로 설정해주세요.'
              placeholder='영문, 숫자, 특수문자 혼합 8자 이상 입력'
            />
          </div>
        </label>
      </div>
      {/* passwordCheck */}
      <div
        css={css`
          margin-bottom: 32px;
        `}
      >
        <label
          htmlFor='passwordCheck'
          css={css`
            font-size: 14px;
            font-weight: 500;
            line-height: 21px;
            letter-spacing: -0.25px;
          `}
        >
          비밀번호 확인
          <div
            css={css`
              margin-top: 4px;
            `}
          >
            <InputPasswordItem
              id='passwordCheck'
              value={passwordCheck}
              setValue={setPasswordCheck}
              validate={validatePasswordCheck}
              errorMessage='비밀번호가 일치하지 않습니다.'
              placeholder='영문, 숫자, 특수문자 혼합 8자 이상 입력'
            />
          </div>
        </label>
      </div>
      <MainButton disabled={setButtonStatus()} onClick={submit}>
        재설정 완료
      </MainButton>
    </div>
  );
};

const FindPassword = ({ setComponent }) => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);
  const [canRequest, setCanRequest] = useState(false);
  const [verification, setVerification] = useState(false);

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
      setValue(e.target.value);
      onFocus();
    },
    [onFocus, setValue],
  );
  const remove = useCallback(() => setValue(''), [setValue]);

  const onClick = useCallback(() => {
    if (!verification) {
      console.log('통신성공');
      // TODO: 통신 실패시, errorMessage1, setVerification(false) 필요

      setVerification(true);
    } else {
      setVerification(false);
      setValue2(undefined);
      setStatus2(undefined);
    }
  }, [verification]);

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
    if (validateEmail(value)) {
      setCanRequest(true);
    } else {
      setCanRequest(false);
    }
  }, [value]);

  useEffect(() => {
    if (value2 === undefined) {
      setStatus2(undefined);
      return;
    }
    // if (value2.length < 6) {
    //   setStatus2('invalid');
    //   setError2(true);
    // } else {
    if (true) {
      console.log('통신성공', value2);
      setError2(false);
      setStatus2('success');
    }
    //  else {
    //   console.log('통신실패', value2);
    //   setError2(true);
    //   setStatus2('failure');
    // }
    // }
  }, [value2]);

  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      <div>
        <div
          css={css`
            position: relative;
            width: 100%;
          `}
        >
          <input
            ref={phoneNumberInputRef}
            id='email'
            disabled={verification}
            placeholder='sample@email.com'
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            type='email'
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
              {/* TODO: 확인submit2 success일 경우 인증 완료*/}
              {'인증 요청' || '인증 완료'}
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
            입력하신 이메일로 인증코드를 보냈어요!
            <div
              css={css`
                margin-top: 4px;
                position: relative;
                width: 100%;
              `}
            >
              <input
                id={'email' + ' verificationCode'}
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
                {
                  //submit2가 성공할 경우 노출
                  <RoundButton disabled={true} type='filled' onClick={onClick2}>
                    확인
                  </RoundButton>
                }
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
              {status2 === 'success' && '이메일이 인증되었습니다.'}
              {/* {status2 === 'failure' && '인증번호가 일치하지 않습니다.'} */}
              {/* {status2 === 'invalid' && '인증번호 6자리를 입력해주세요.'} */}
            </div>
          )}
        </div>
      )}
      <div
        css={css`
          margin-top: 32px;
        `}
      >
        <MainButton
          disabled={false}
          onClick={() => {
            setComponent('updatePassword');
          }}
        >
          비밀번호 재설정하기
        </MainButton>
      </div>
    </div>
  );
};

const FindEmail = ({ setComponent }) => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1);

  const disabled = !(name && phoneNumber);
  return (
    <div
      css={css`
        width: 320px;
      `}
    >
      {step === 1 && (
        <div>
          {/* email */}
          <div
            css={css`
              margin-bottom: 24px;
            `}
          >
            <label
              htmlFor='name'
              css={css`
                font-size: 14px;
                font-weight: 500;
                line-height: 21px;
                letter-spacing: -0.25px;
              `}
            >
              이름
              <div
                css={css`
                  margin-top: 4px;
                `}
              >
                <InputDefaultItem
                  id='email'
                  value={name}
                  setValue={setName}
                  validate={() => true}
                  placeholder='이름 입력'
                />
              </div>
            </label>
          </div>
          {/* phoneNumber */}
          <div
            css={css`
              margin-bottom: 32px;
            `}
          >
            <label
              htmlFor='phoneNumber'
              css={css`
                font-size: 14px;
                font-weight: 500;
                line-height: 21px;
                letter-spacing: -0.25px;
              `}
            >
              휴대폰 번호
              <div
                css={css`
                  margin-top: 4px;
                `}
              >
                <InputDefaultItem
                  id='phoneNumber'
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  validate={() => true}
                  placeholder='‘-’ 없이 숫자만 입력'
                />
              </div>
            </label>
          </div>
          <div>
            <div
              css={css`
                font-size: 13px;
                font-weight: 400;
                line-height: 19.5px;
                letter-spacing: -0.25px;
                text-align: center;
                margin-bottom: 16px;
                padding: 8px 12px;
                background: #e433330d;
                color: ${theme.statusColors.danger};
                border-radius: 6px;
              `}
            >
              입력하신 정보로 가입한 계정을 찾을 수 없습니다.
            </div>
            <MainButton disabled={disabled} onClick={() => setStep(2)}>
              이메일 찾기
            </MainButton>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div
            css={css`
              font-size: 16px;
              font-weight: 400;
              line-height: 24px;
              letter-spacing: -0.5px;
              margin-bottom: 16px;
            `}
          >
            {'입력하신 정보로 가입한 이메일입니다.' ||
              '소셜 아이디로 가입한 계정입니다.'}
          </div>
          <div
            css={css`
              border: 1px solid ${theme.colors.grey[700]};
              padding: 14px 12px;
              border-radius: 6px;
              opacity: 0.5;
              font-size: 16px;
              font-weight: 400;
              line-height: 24px;
              letter-spacing: -0.5px;
              height: 52px;
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 16px;
            `}
          >
            <span
              css={css`
                width: 24px;
                height: 24px;

                border-radius: 4px;
                border: 1px solid ${theme.colors.grey[700]};
              `}
            >
              {/* logo */}
            </span>
            <span>memopet1@gmail.com</span>
          </div>
          <div
            css={css`
              line-height: 21px;
              letter-spacing: -0.5px;
              font-size: 14px;
              font-weight: 400;
              margin-bottom: 16px;
              padding: 0px 12px;
              height: 34px;
              background: ${theme.colors.grey[100]};
              color: ${theme.colors.grey[900]};
              border-radius: 6px;
              display: flex;
              align-items: center;
              gap: 8px;
              justify-content: center;
              margin-bottom: 32px;
            `}
          >
            <span>비밀번호가 생각나지 않나요?</span>
            <span
              css={css`
                font-size: 14px;
                font-weight: 600;
                line-height: 14px;
                letter-spacing: -0.25px;
                color: ${theme.colors.grey[500]};
                padding: 8px;
                cursor: pointer;
              `}
              onClick={() => setComponent('findPassword')}
            >
              비밀번호 찾기
            </span>
          </div>
          <MainButton
            onClick={() => {
              setComponent('signIn');
            }}
          >
            {'로그인하기' || '소셜 로그인하기'}
          </MainButton>
        </div>
      )}
    </div>
  );
};
const SignIn = ({ setComponent }) => {
  const router = useRouter();
  const localStorageEmail = getItemWithExpireDate('email');

  const theme = useTheme();
  const [email, setEmail] = useState(localStorageEmail || '');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(Boolean(localStorageEmail));
  const [error, setError] = useState({ email: true, password: true });

  async function submit() {
    const isDev = Boolean(process.env.NODE_ENV === 'development');

    if (!isDev && !Object.values(error).every((v) => v === false)) return;

    try {
      await fetchWrapper(`${process.env.NEXT_PUBLIC_API_URL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: isDev ? 'user3@gmail.com' : email,
          password: isDev ? 'user12#$' : password,
        }),
      });
      if (check) {
        setItemWithExpireDate('email', email);
      } else {
        localStorage.removeItem('email');
      }
      router.reload();
    } catch (error) {
    } finally {
    }
  }

  return (
    <div
      css={css`
        width: 320px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        `}
      >
        <div>
          <InputDefaultItem
            id='email'
            value={email}
            setValue={setEmail}
            placeholder='이메일 입력'
            validate={validateEmail}
            setError={setError}
            errorMessage={
              email === ''
                ? '이메일을 입력해주세요.'
                : '이메일을 정확히 입력해주세요.'
            }
          />
        </div>
        <div>
          <InputPasswordItem
            id='password'
            value={password}
            setValue={setPassword}
            placeholder='비밀번호 입력'
            validate={() => Boolean(password)}
            errorMessage={'비밀번호를 입력해주세요.'}
            setError={setError}
          />
        </div>
        <div
          css={css`
            display: flex;
            gap: 4px;
            align-items: center;
          `}
        >
          <CheckButton checked={check} setChecked={setCheck} />
          <span
            css={css`
              font-size: 14px;
              font-weight: 400;
              line-height: 21px;
              letter-spacing: -0.5px;
              color: ${theme.colors.grey[900]};
            `}
          >
            이메일 기억하기
          </span>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
      >
        <MainButton type='filled' onClick={submit}>
          로그인
        </MainButton>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 600;
            line-height: 14px;
            letter-spacing: -0.25px;
            color: ${theme.colors.grey[500]};
          `}
        >
          <span
            css={css`
              padding: 12px;
              cursor: pointer;
            `}
            onClick={() => setComponent('findEmail')}
          >
            이메일 찾기
          </span>
          <span>|</span>
          <span
            css={css`
              padding: 12px;
              cursor: pointer;
            `}
            onClick={() => setComponent('findPassword')}
          >
            비밀번호 찾기
          </span>
          <span>|</span>
          <span
            onClick={() => setComponent('signUp')}
            css={css`
              padding: 12px;
              cursor: pointer;
            `}
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
};
const OAuth = ({ setComponent }) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        width: 320px;
        margin-top: -16px;
      `}
    >
      <div
        css={css`
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: -0.5px;
          color: ${theme.colors.grey[700]};
          margin-bottom: 32px;
        `}
      >
        간편하게 로그인하고 반려동물과의 소중한 추억을 기록하고 공유해보세요!
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
      >
        <div
          css={css`
            border: 1px solid ${theme.colors.grey[200]};
            border-radius: 8px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          google button
        </div>
        <NaverLogin />
      </div>
      <div
        css={css`
          margin-top: 12px;
          font-size: 14px;
          font-weight: 600;
          line-height: 14px;
          letter-spacing: -0.25px;
          line-height: 1em;
          color: ${theme.colors.grey[500]};
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <span
          onClick={() => setComponent('signIn')}
          css={css`
            padding: 12px;
          `}
        >
          이메일로 로그인
        </span>
        <span>|</span>
        <span
          onClick={() => setComponent('signUp')}
          css={css`
            padding: 12px;
          `}
        >
          회원가입
        </span>
      </div>
    </div>
  );
};

const SignInModal = ({ render }: ISignUpProps) => {
  const [component, setComponent] = useState<
    | 'oauth'
    | 'signUp'
    | 'signIn'
    | 'findEmail'
    | 'findPassword'
    | 'updatePassword'
    | 'updateCompleted'
  >('oauth');
  const [step, setStep] = useState(1);

  function titleHandler(): string {
    if (component === 'signUp') {
      return step === 1 ? '이용약관 동의' : '회원가입';
    } else if (component === 'signIn') {
      return '이메일 로그인';
    } else if (component === 'findEmail') {
      return '이메일 찾기';
    } else if (component === 'findPassword') {
      return '비밀번호 찾기';
    } else if (component === 'updatePassword') {
      return '비밀번호 재설정';
    } else if (component === 'oauth') {
      return '시작하기';
    } else {
      return '';
    }
  }
  return (
    <UserPopup title={titleHandler()} render={render}>
      {component === 'oauth' && <OAuth setComponent={setComponent} />}
      {component === 'signIn' && <SignIn setComponent={setComponent} />}
      {component === 'signUp' && (
        <SignUp step={step} setStep={setStep} render={render} />
      )}
      {component === 'findEmail' && <FindEmail setComponent={setComponent} />}
      {component === 'findPassword' && (
        <FindPassword setComponent={setComponent} />
      )}
      {(component === 'updatePassword' || component === 'updateCompleted') && (
        <UpdatePassword
          render={render}
          component={component}
          setComponent={setComponent}
        />
      )}
    </UserPopup>
  );
};

export default SignInModal;
