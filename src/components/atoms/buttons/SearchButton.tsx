import { css, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import ReadingGlassesIcon from '@/assets/icon/ReadingGlassesIcon';
import { useDebounce } from '@/hooks/useDebounce';

interface ISearchButtonProps {
  color: 'default' | 'white';
  placeholder?: string;
  onSubmit?: (e: string) => void;
  onDebounceChange?: (e: string) => void;
}

const SearchButton: React.FC<ISearchButtonProps> = ({
                                                      color = 'default',
                                                      placeholder = '사용자 또는 키워드를 검색해 보세요',
                                                      onSubmit,
                                                      onDebounceChange,
                                                    }) => {
  const isDefault = Boolean(color === 'default');
  const theme = useTheme();
  const [value, setValue] = useState<string>('');
  const [active, setActive] = useState(false);

  const { debouncedValue } = useDebounce({ value, delay: 500 });


  useEffect(() => {
    onDebounceChange && onDebounceChange(debouncedValue);
  }, [debouncedValue]);

  function click() {
    setActive((prev) => !prev);
  }

  return (
    <>
      {!active ? (
        <div
          onClick={click}
          css={css`
            width: 40px;
            height: 40px;
            margin: 0 8px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              background: rgba(23, 23, 23, 0.05);
            }

            transition: all 0.1s;
          `}
        >
          <ReadingGlassesIcon
            stroke={color === 'default' ? theme.colors.grey[700] : theme.colors.grey[0]}
          />
        </div>
      ) : (
        <div
          css={css`
            position: relative;
          `}
        >
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            css={css`
              height: 40px;
              font-size: 1rem;
              font-weight: 400;
              line-height: 24px;
              letter-spacing: -0.5px;
              padding: 8px 16px 8px 48px;
              width: 300px;
              border-radius: 99px;
              border: ${isDefault
                ? '1px solid var(--grey-700)'
                : '1px solid var(--grey-0)'};
              color: ${isDefault ? 'var(--grey-700)' : 'var(--grey-0)'};
              background: ${isDefault
                ? 'var(--grey-0)'
                : 'rgba(23, 23, 23, 0.5)'};

              &:focus {
                outline: none;
              }

              &::placeholder {
                color: ${theme.colors.grey[400]};
              }

              @keyframes width {
                from {
                  width: 0;
                  opacity: 0;
                }
                to {
                  width: 300px;
                  opacity: 1;
                }
              }
              animation: width 0.2s ease-out forwards;
            `}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSubmit && onSubmit(value);
              }
            }}
          />
          <div
            onClick={click}
            css={css`
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              top: 0;
              left: .5rem;

              &:hover {
                background: rgba(23, 23, 23, 0.05);
              }

              transition: all 0.3s;
            `}
          >
            <ReadingGlassesIcon
              stroke={color === 'default' ? theme.colors.grey[700] : theme.colors.grey[0]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchButton;
