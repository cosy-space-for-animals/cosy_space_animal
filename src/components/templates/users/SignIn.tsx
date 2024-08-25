import CheckButton from '@/components/atoms/buttons/CheckButton';
import MainButton from '@/components/atoms/buttons/MainButton';
import InputDefaultItem from '@/components/atoms/input/InputDefaultItem';
import InputPasswordItem from '@/components/atoms/input/InputPasswordItem';
import UserPopup from '@/components/molecules/users/userPopup';
import {
  getItemWithExpireDate,
  restrictToNumbers,
  setCookie,
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
import { useRouter } from 'next/router';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { Nullable } from '@/types/global';
import InputMobileVerification from '@/components/atoms/input/InputMobileVerification';

declare global {
  interface Window {
    naver: any;
  }
}

interface ISignUpProps {
  render: Dispatch<SetStateAction<boolean>>;
}

const UpdatePassword = ({
  render,
  setComponent,
  component,
  param,
  setParam,
}) => {
  const { email } = param;
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  function validatePasswordCheck() {
    return Boolean(password === passwordCheck);
  }

  function setButtonStatus() {
    return !(validatePassword(password) && validatePasswordCheck());
  }

  async function submit() {
    // email

    try {
      type Data = {
        data: { changeMyPasswordResponse: { dscCode: string } };
      };

      const data = await fetchWrapper<Data>(
        `${process.env.NEXT_PUBLIC_API_URL}/sign-in/my-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      if (data.data.changeMyPasswordResponse.dscCode === '1') {
        setComponent('updateCompleted');
      }
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    return () => {
      setParam({});
    };
  }, [setParam]);

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

const FindPassword = ({ setComponent, setParam }) => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);
  const [canRequest, setCanRequest] = useState(false);
  const [verification, setVerification] = useState(false);
  const [errorMessage, setErrorMessge] = useState(false);
  const [authCode, setAuthCode] = useState('');

  const [focus2, setFocus2] = useState(false);
  const [value2, setValue2] = useState<string | undefined>(undefined);
  const [error2, setError2] = useState(false);
  const [status2, setStatus2] = useState<
    'success' | 'failure' | 'invalid' | undefined
  >(undefined);
  const [toast2, setToast2] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

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

  const onClick = useCallback(async () => {
    if (!verification) {
      // 중복체크
      try {
        type Data = {
          data: { duplicationCheckResponse: { dscCode: string } };
        };

        const data = await fetchWrapper<Data>(
          `${process.env.NEXT_PUBLIC_API_URL}/sign-in/duplication-check?email=${value}`,
        );
        if (data.data.duplicationCheckResponse.dscCode === '1') {
          // dscCode === "1" : 이메일 존재 X
          setErrorMessge(true);
          setVerification(false);
        } else {
          // dscCode === "0" : 이메일 존재 O
          setErrorMessge(false);
          setVerification(true);
          try {
            type Data2 = {
              data: { response: { authCode: string } };
            };
            const data = await fetchWrapper<Data2>(
              `${process.env.NEXT_PUBLIC_API_URL}/sign-in/verification`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: value,
                }),
              },
            );
            setAuthCode(data.data.response.authCode);
          } catch (error) {
            // console.log(error)
          }
        }
      } catch (error) {
        // console.log(error)
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
    setValue2(e.target.value.trim().slice(0, 8));
  }, []);
  const remove2 = useCallback(() => {
    setValue2('');
  }, [setValue2]);

  const onClick2 = useCallback(() => {
    if (value2 === undefined) {
      setStatus2(undefined);
      return;
    }

    if (value2.length < 6) {
      setStatus2('invalid');
      setError2(true);
    } else {
      if (authCode === value2) {
        setError2(false);
        setStatus2('success');
        setCanGoNext(true);
      } else {
        setError2(true);
        setStatus2('failure');
      }
    }
  }, [authCode, value2]);

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
              disabled={!canRequest || canGoNext}
              type={verification ? 'outline' : 'filled'}
              onClick={onClick}
            >
              {canGoNext ? '인증 완료' : '인증 요청'}
            </RoundButton>
          </label>
        </div>
        {errorMessage && (
          <>
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
              해당 이메일로 가입한 계정을 찾을 수 없습니다.
            </div>
            <div
              css={css`
                margin-top: 16px;
                line-height: 21px;
                letter-spacing: -0.5px;
                font-size: 14px;
                font-weight: 400;
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
              <span>가입한 이메일이 생각나지 않나요?</span>
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
                onClick={() => setComponent('findEmail')}
              >
                이메일 찾기
              </span>
            </div>
          </>
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
                placeholder='인증번호 8자리 입력'
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
                  <RoundButton
                    disabled={canGoNext}
                    type='filled'
                    onClick={onClick2}
                  >
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
              {status2 === 'failure' && '인증번호가 일치하지 않습니다.'}
              {status2 === 'invalid' && '인증번호 8자리를 입력해주세요.'}
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
          disabled={!canGoNext}
          onClick={() => {
            if (!canGoNext) return;
            setComponent('updatePassword');
            setParam({ email: value });
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
  const [userData, setUserData] = useState<
    Nullable<{
      dscCode: string;
      email: string;
      socialLoginProvider: Nullable<string>;
    }>
  >(null);

  const disabled = !(name && phoneNumber);

  async function submit() {
    if (!name || !phoneNumber) return;

    try {
      type Data = {
        data: {
          findMyIdResponse: {
            dscCode: string;
            email: string;
            socialLoginProvider: Nullable<string>;
          };
        };
      };
      const data = await fetchWrapper<Data>(
        `${process.env.NEXT_PUBLIC_API_URL}/sign-in/my-id`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: name,
            phoneNum: phoneNumber,
          }),
        },
      );

      setUserData(data.data.findMyIdResponse);
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    if (!userData) return;

    const { dscCode } = userData;
    if (dscCode !== '0') {
      setStep(2);
    }
  }, [userData]);

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
                  id='name'
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
            {userData?.dscCode === '0' && (
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
            )}
            <MainButton disabled={disabled} onClick={submit}>
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
              border: 1px solid #40404080;
              padding: 14px 12px;
              border-radius: 6px;
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
            {/* logo */}
            {userData?.socialLoginProvider === 'naver' && (
              <Image
                src={`/naver-24px.svg`}
                width={24}
                height={24}
                alt='naver logo'
              />
            )}
            {userData?.socialLoginProvider === 'google' && (
              <Image
                src={`/google-24px.svg`}
                width={24}
                height={24}
                alt='naver logo'
              />
            )}
            <span
              css={css`
                color: ${theme.colors.grey[500]};
              `}
            >
              {userData?.email}
            </span>
          </div>
          {userData?.dscCode === '1' && (
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
          )}
          <MainButton
            onClick={() => {
              setComponent(userData?.dscCode === '1' ? 'signIn' : 'oauth');
            }}
          >
            {userData?.dscCode === '1' && '로그인하기'}
            {userData?.dscCode === '2' && '소셜 로그인하기'}
          </MainButton>
        </div>
      )}
    </div>
  );
};
const SignIn = ({ setComponent }) => {
  const router = useRouter();
  const localStorageEmail = getItemWithExpireDate('email');
  const isDev = Boolean(process.env.NODE_ENV === 'development');

  const theme = useTheme();
  const [email, setEmail] = useState(localStorageEmail || '');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(Boolean(localStorageEmail));
  const [error, setError] = useState({
    email: !isDev ? !Boolean(localStorageEmail) : false,
    password: !isDev,
  });
  const [loginCount, setLoginCount] = useState(0);
  const [errorCode, setErrorCode] =
    useState<
      Nullable<
        'UsernameNotFoundException' | 'Bad_Credentials_request' | 'bad_request'
      >
    >(null);

  async function submit() {
    if (!Object.values(error).every((v) => v === false)) return;

    type Data = {
      data: {
        loginInfo: {
          username: string;
          userStatus: string;
          phoneNumYn: 'Y' | 'N';
          userRole: string;
          loginFailCount: number;
          accessToken: string;
          memberId: string;
        };
      };
    };
    try {
      const data = await fetchWrapper<Data>(
        `${process.env.NEXT_PUBLIC_API_URL}/sign-in`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // email,
            // password,
            email: isDev ? process.env.NEXT_PUBLIC_LOGIN_ID : email,
            password: isDev ? process.env.NEXT_PUBLIC_LOGIN_PW : password,
          }),
        },
      );

      // 이메일 기억하기
      if (check) {
        setItemWithExpireDate('email', email);
      } else {
        localStorage.removeItem('email');
      }

      // accessToken 저장
      // TODO: 만료일 수정
      const accessToken = data.data.loginInfo.accessToken;
      setCookie('accessToken', accessToken, 30);
      setErrorCode(null);

      router.reload();
    } catch (error) {
      if (error.status === 400) {
        if (error.response.code === 'UsernameNotFoundException') {
          console.log('아이디가 없음');
        }
        if (error.response.code === 'Bad_Credentials_request') {
          setLoginCount(+error.response.loginCount);
          console.log('비밀번호가 틀림');
        }
        if (error.response.code === 'bad_request') {
          console.log('5회 넘음');
        }
        setErrorCode(error.response.code);
      }
    }
  }

  useEffect(() => {
    if (errorCode === 'bad_request') {
      setComponent('loginFailure');
    }
  }, [errorCode, setComponent]);

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
            validate={isDev ? () => true : validateEmail}
            // validate={validateEmail}
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
            validate={() => (isDev ? true : Boolean(password))}
            // validate={() => Boolean(password)}
            errorMessage={'비밀번호를 입력해주세요.'}
            setError={setError}
          />
        </div>
        {errorCode && (
          <div
            css={css`
              font-size: 13px;
              font-weight: 400;
              line-height: 19.5px;
              letter-spacing: -0.25px;
              text-align: center;
              padding: 8px 12px;
              background: #e433330d;
              color: ${theme.statusColors.danger};
              border-radius: 6px;
            `}
          >
            {errorCode === 'UsernameNotFoundException' &&
              `등록되지 않은 이메일입니다.`}
            {errorCode === 'Bad_Credentials_request' &&
              `이메일 또는 비밀번호를 잘못 입력했습니다. (${loginCount}/5)`}
          </div>
        )}
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

const LoginFailure = ({ setComponent, render }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [canGoNext, setCanGoNext] = useState(false);
  const [status, setStauts] = useState<Nullable<'error' | 'success'>>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  async function submit() {
    if (!canGoNext) return;

    try {
      await fetchWrapper(
        `${process.env.NEXT_PUBLIC_API_URL}/sign-in/password-reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        },
      );
      setStauts('success');
    } catch (error) {
      if (
        error.status === 400 &&
        error.response.code === 'UsernameNotFoundException'
      ) {
        setStauts('error');
      }
    }
  }

  useEffect(() => {
    if (status === 'success') {
      setIsCompleted(true);
    }
  }, [status]);

  useEffect(() => {
    // validateEmail할거면, error message 보여줘야 함
    setCanGoNext(Boolean(email));
  }, [email]);

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
            white-space: pre-wrap;
          `}
        >
          {`재설정한 비밀번호로\n로그인 해주세요.`}
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
      <div
        css={css`
          white-space: pre-wrap;
          font-size: 1rem;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: -0.5px;
          color: ${theme.colors.grey[700]};
        `}
      >
        <b
          css={css`
            color: ${theme.colors.primary[500]};
          `}
        >
          5회 이상
        </b>{' '}
        {`로그인 실패하여\n보안을 위해 로그인을 제한합니다.\n이메일 계정을 입력하시면 로그인 할 수 있는\n`}
        <b
          css={css`
            color: ${theme.colors.primary[500]};
          `}
        >
          새로운 비밀번호
        </b>
        를 받을 수 있습니다.
      </div>
      <div
        css={css`
          margin-top: 32px;
        `}
      >
        <label
          htmlFor='email'
          css={css`
            font-size: 14px;
            font-weight: 500;
            line-height: 21px;
            letter-spacing: -0.25px;
          `}
        >
          이메일
          <div
            css={css`
              margin-top: 4px;
            `}
          >
            <InputDefaultItem
              id='email'
              value={email}
              setValue={setEmail}
              validate={() => true}
            />
          </div>
        </label>
        {status === 'error' && (
          <>
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
              해당 이메일로 가입한 계정을 찾을 수 없습니다.
            </div>
            <div
              css={css`
                margin-top: 16px;
                line-height: 21px;
                letter-spacing: -0.5px;
                font-size: 14px;
                font-weight: 400;
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
              <span>가입한 이메일이 생각나지 않나요?</span>
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
                onClick={() => setComponent('findEmail')}
              >
                이메일 찾기
              </span>
            </div>
          </>
        )}
      </div>
      <div
        css={css`
          margin-top: 32px;
        `}
      >
        <MainButton disabled={!canGoNext} onClick={submit}>
          새로운 비밀번호 받기
        </MainButton>
      </div>
    </div>
  );
};

const CheckPhoneNumber = ({ setComponent }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(false);

  function submit() {
    console.log('api 연결 예정');
    // TODO: {{baseURL}}/api/member-info api 연결 -> 폰번호 수정
  }

  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      <div
        css={css`
          font-size: 1rem;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: -0.5px;
        `}
      >
        안전한 로그인을 위해 딱 한 번만 인증해주세요.
      </div>
      <div
        css={css`
          margin-top: 32px;
        `}
      >
        <InputMobileVerification
          id='phonenumber'
          value={phoneNumber}
          setValue={setPhoneNumber}
          setVerificationResult={setVerificationResult}
        />
      </div>
      <div
        css={css`
          margin-top: 32px;
        `}
      >
        <MainButton disabled={!verificationResult} onClick={submit}>
          인증 완료
        </MainButton>
      </div>
    </div>
  );
};

const OAuth = ({ setComponent, render }) => {
  const theme = useTheme();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      (async function (response: TokenResponse) {
        try {
          type Data = {
            data: {
              loginResponseDto: {
                username: string;
                userStatus: string;
                phoneNumYn: 'Y' | 'N';
                userRole: string;
                accessToken: string;
                email: string;
                memberId: string;
              };
            };
          };
          const data = await fetchWrapper<Data>(
            `${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/code/google`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                access_token: response.access_token,
                state: '',
                token_type: response.token_type,
                expires_in: response.expires_in + '',
              }),
            },
          );

          setCookie('accessToken', data.data.loginResponseDto.accessToken);

          if (data.data.loginResponseDto.phoneNumYn === 'N') {
            // TODO: 번호등록 모달로 이동
            setComponent('checkPhoneNumber');
          } else {
            render(false);
          }
        } catch (error) {
          // console.log(error)
        }
      })(response);
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  const naverLogin = () => {
    const ele = document.getElementById('naverIdLogin')?.firstChild;
    if (!ele) return;
    const a = ele as HTMLAnchorElement;

    a.click();
  };

  useEffect(() => {
    // naver login
    const { naver } = window;
    if (!naver) return;

    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/user/naver/callback',
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: '40' }, // 로그인 버튼의 스타일
    });

    naverLogin.init();
  }, []);

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
          onClick={() => googleLogin()}
          css={css`
            border: 1px solid ${theme.colors.grey[200]};
            border-radius: 8px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${theme.colors.grey[900]};
            cursor: pointer;
          `}
        >
          <Image
            src='/web_light_sq_go.svg'
            width={40}
            height={40}
            alt='google logo'
          />
          Google 계정으로 로그인
        </div>
        <>
          <div
            id='naverIdLogin'
            css={css`
              display: none;
            `}
          />
          <div
            onClick={naverLogin}
            css={css`
              border-radius: 8px;
              height: 52px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #03c75a;
              font-size: 16px;
              font-weight: 600;
              line-height: 1em;
              letter-spacing: -0.25px;
              color: ${theme.colors.grey[0]};
              cursor: pointer;
            `}
          >
            <Image
              src='/web_light_sq_na.svg'
              width={40}
              height={40}
              alt='naver logo'
            />
            네이버 계정으로 로그인
          </div>
        </>
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
    | 'loginFailure'
    | 'checkPhoneNumber'
  >('oauth');

  const [step, setStep] = useState(1);
  const [param, setParam] = useState({});

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
    } else if (component === 'loginFailure') {
      return '로그인 실패';
    } else if (component === 'checkPhoneNumber') {
      return '휴대폰 인증';
    } else {
      return '';
    }
  }

  return (
    <UserPopup title={titleHandler()} render={render}>
      {component === 'oauth' && (
        <OAuth setComponent={setComponent} render={render} />
      )}
      {component === 'signIn' && <SignIn setComponent={setComponent} />}
      {component === 'signUp' && (
        <SignUp step={step} setStep={setStep} render={render} />
      )}
      {component === 'findEmail' && <FindEmail setComponent={setComponent} />}
      {component === 'findPassword' && (
        <FindPassword setComponent={setComponent} setParam={setParam} />
      )}
      {(component === 'updatePassword' || component === 'updateCompleted') && (
        <UpdatePassword
          render={render}
          component={component}
          setComponent={setComponent}
          param={param}
          setParam={setParam}
        />
      )}
      {component === 'loginFailure' && (
        <LoginFailure setComponent={setComponent} render={render} />
      )}
      {component === 'checkPhoneNumber' && (
        <CheckPhoneNumber setComponent={setComponent} />
      )}
    </UserPopup>
  );
};

export default SignInModal;
