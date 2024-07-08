import RoundButton from '@/components/atoms/buttons/RoundButton';
import InputDefaultItem from '@/components/atoms/input/InputDefaultItem';
import { css, useTheme } from '@emotion/react';
import { ChangeEvent, useState } from 'react';

const CommentInput = () => {
  const theme = useTheme();

  const [inputValue, setInputValue] = useState('');

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputValue.length >= 60) return;
    setInputValue(e.target.value);
  };

  const handleClickCancelButton = () => {
    setInputValue('');
  };
  const handleClickSubmitButton = () => {};

  return (
    <div
      css={css`
        width: 360px;
        flex-shrink: 0;
        border-radius: 8px;
        background: ${theme.colors.grey[0]};
        border: 1px solid ${theme.colors.grey[700]};
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        &:hover {
          box-shadow: 0px 4px 0px 0px #171717;
        }
      `}
    >
      <InputDefaultItem
        value={inputValue}
        setValue={setInputValue}
        validate={true}
        placeholder='따뜻한 한마디를 남겨주세요'
      />
      <div
        css={css`
          display: flex;
          justify-content: end;
          gap: 4px;
        `}
      >
        <RoundButton
          type='outline'
          disabled={!inputValue}
          onClick={handleClickCancelButton}
        >
          취소
        </RoundButton>
        <RoundButton type='filled' onClick={handleClickSubmitButton}>
          남기기
        </RoundButton>
      </div>
    </div>
  );
};

export default CommentInput;
