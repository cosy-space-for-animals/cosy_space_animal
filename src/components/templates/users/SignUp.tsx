import MainButton from '@/components/atoms/buttons/MainButton';
import InputDefaultItem from '@/components/atoms/input/InputDefaultItem';
import InputMobileVerification from '@/components/atoms/input/InputMobileVerification';
import InputPasswordItem from '@/components/atoms/input/InputPasswordItem';
import AccordionMenuItem, {
  TAccordionMenuItem,
} from '@/components/molecules/AccordionMenuItem';
import UserPopup from '@/components/molecules/users/userPopup';
import type { Nullable } from '@/types/global';
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from '@/utils/common';
import fetchWrapper from '@/utils/fetchWrapper';
import { css, useTheme } from '@emotion/react';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

interface ISignUpProps {
  render: Dispatch<SetStateAction<boolean>>;
}

const Step1 = ({ setStep }) => {
  const [canGoNext, setCanGoNext] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set([]));
  const [data, setData] = useState<Nullable<Array<TAccordionMenuItem>>>(null);

  function goToNextStep() {
    if (!canGoNext) return;
    setStep(2);
  }

  async function fetchData() {
    const data = await fetchWrapper(`/data/signup/agree.json`);
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    if (data.length === selected.size) {
      setCanGoNext(true);
    } else {
      setCanGoNext(false);
    }
  }, [selected, data]);

  return (
    <div>
      {data?.map((v) => (
        <AccordionMenuItem
          key={v.id}
          title={`[필수] ${v.title}`}
          data={v}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
      <MainButton disabled={!canGoNext} onClick={goToNextStep}>
        다음
      </MainButton>
    </div>
  );
};

const Step2 = ({ setStep }) => {
  const theme = useTheme();
  const [canGoNext, setCanGoNext] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  function validatePasswordCheck() {
    return Boolean(password === passwordCheck);
  }
  function signUp() {
    if (!canGoNext) return;
  }

  return (
    <div>
      <div
        css={css`
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        `}
      >
        {/* email */}
        <div>
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
                validate={validateEmail}
                errorMessage='이메일을 정확히 입력해주세요.'
                placeholder='sample@email.com'
              />
            </div>
          </label>
        </div>
        {/* password */}
        <div>
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
                errorMessage='영문, 숫자, 특수문자 혼합하여 8자 이상으로 설정해야 합니다.'
                placeholder='영문, 숫자, 특수문자 혼합 8자 이상 입력'
              />
            </div>
          </label>
        </div>
        {/* passwordCheck */}
        <div>
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
        {/* name */}
        <div>
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
                validate={validateUserName}
                errorMessage='한글만 입력해주세요. (영문, 특수기호 입력 불가)'
                placeholder='이름 입력'
              />
            </div>
          </label>
        </div>
        {/* phoneNumber */}
        <div>
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
              <InputMobileVerification
                id='phoneNumber'
                // 폰번호 필요, 코드 필요
                value={phoneNumber}
                setValue={setPhoneNumber}
                code={verificationCode}
                setCode={verificationCode}
              />
            </div>
          </label>
        </div>
        {/* verificationCode */}
      </div>
      <MainButton disabled={!canGoNext} onClick={signUp}>
        회원가입
      </MainButton>
    </div>
  );
};
const SignUp = ({ step = 1, setStep }) => {
  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      {step === 1 && <Step1 setStep={setStep} />}
      {step === 2 && <Step2 setStep={setStep} />}
    </div>
  );
};

const SignUpModal = ({ render }) => {
  const [step, setStep] = useState(1);

  return (
    <UserPopup
      title={step === 1 ? '이용약관 동의' : '회원가입'}
      render={render}
    >
      <SignUp step={step} setStep={setStep} />
    </UserPopup>
  );
};

export { SignUp };
export default SignUpModal;
