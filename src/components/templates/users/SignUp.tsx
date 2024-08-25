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
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import SignInModal from './SignIn';
import CheckBoxWithLabel from '@/components/molecules/CheckBoxWithLabel';

interface ISignUpProps {
  render: Dispatch<SetStateAction<boolean>>;
}

type Component = 'signup' | 'signin';
type SetComponent = Dispatch<SetStateAction<Component>>;

const Step1 = ({ setStep }) => {
  const theme = useTheme();
  const [canGoNext, setCanGoNext] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set([]));
  const [data, setData] = useState<Nullable<Array<TAccordionMenuItem>>>(null);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  function goToNextStep() {
    if (!canGoNext) return;
    setStep(2);
  }

  async function fetchData() {
    type Data = [
      {
        id: number;
        required: boolean;
        title: string;
        desc: Nullable<string>;
      },
    ];
    const data = await fetchWrapper<Data>(`/public/data/signup/agree.json`);
    setData(data);
  }

  function selectAll() {
    if (isSelectedAll) {
      setSelected(new Set());
    } else {
      const _data = data?.map((v) => v.id);
      setSelected(new Set(_data));
    }
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

  useEffect(() => {
    if (data?.length === selected.size) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [data, selected]);

  return (
    <div>
      <div
        css={css`
          padding: 16px 0;
          border-bottom: 1px solid ${theme.colors.grey[200]};
          margin-bottom: 16px;
        `}
      >
        <CheckBoxWithLabel
          name='select all'
          value={isSelectedAll}
          onChange={selectAll}
          label='전체 동의합니다.'
        />
      </div>
      {data?.map((v) => (
        <AccordionMenuItem
          key={v.id}
          title={`${v.required ? '[필수] ' : ''}${v.title}`}
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

const Step2 = ({ setComponent }: { setComponent: SetComponent }) => {
  const [canGoNext, setCanGoNext] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [error, setError] = useState({
    email: true,
    password: true,
    name: true,
    // TODO: check phoneNumber
    // phoneNumber: true,
  });

  const validatePasswordCheck = useCallback(() => {
    return Boolean(password === passwordCheck);
  }, [password, passwordCheck]);

  async function validate_email(value: string) {
    if (!validateEmail(value)) {
      setEmailErrorMessage('이메일을 정확히 입력해주세요.');
      return false;
    } else {
      type Data = {
        data: {
          duplicationCheckResponse: {
            dscCode: string;
            errMessage: string;
          };
        };
      };

      const data = await fetchWrapper<Data>(
        `/sign-in/duplication-check?email=${value}`,
      );
      if (data.data.duplicationCheckResponse.dscCode === '0') {
        setEmailErrorMessage('이미 가입한 계정입니다.');
        return false;
      } else {
        setEmailErrorMessage('');
        return true;
      }
    }
  }

  async function submit() {
    if (!canGoNext) return;

    const response = await fetchWrapper(`/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        email,
        password,
        phoneNum: phoneNumber,
        roleDscCode: '1',
      }),
    });

    if (response) {
      setComponent('signin');
    }
  }

  useEffect(() => {
    if (
      Object.values(error).every((v) => v === false) &&
      validatePasswordCheck() &&
      verificationResult
    ) {
      setCanGoNext(true);
    } else {
      setCanGoNext(false);
    }
  }, [error, validatePasswordCheck, verificationResult]);

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
                validate={validate_email}
                errorMessage={emailErrorMessage}
                placeholder='sample@email.com'
                setError={setError}
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
                setError={setError}
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
                setError={setError}
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
                setVerificationResult={setVerificationResult}
                setError={setError}
              />
            </div>
          </label>
        </div>
        {/* verificationCode */}
      </div>
      <MainButton disabled={!canGoNext} onClick={submit}>
        회원가입
      </MainButton>
    </div>
  );
};

const SignUp = ({ step = 1, setStep, setComponent }) => {
  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      {step === 1 && <Step1 setStep={setStep} />}
      {step === 2 && <Step2 setComponent={setComponent} />}
    </div>
  );
};

const SignUpModal = ({ render }: ISignUpProps) => {
  const [step, setStep] = useState(1);
  const [component, setComponent] = useState<Component>('signup');
  return (
    <>
      {component === 'signup' && (
        <UserPopup
          title={step === 1 ? '이용약관 동의' : '회원가입'}
          render={render}
        >
          <SignUp step={step} setStep={setStep} setComponent={setComponent} />
        </UserPopup>
      )}
      {component === 'signin' && <SignInModal render={render} />}
    </>
  );
};

export { SignUp };
export default SignUpModal;
