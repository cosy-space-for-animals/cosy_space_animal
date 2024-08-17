'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { IInputItemProps } from '@/types/common';
import InputSearchItem from '@/components/atoms/input/InputSearchItem';
import { css, keyframes, useTheme } from '@emotion/react';
import { useDebounce } from '@/hooks/useDebounce';

interface Props extends IInputItemProps {
  searchResults: string[];
  isShown?: boolean;
  disabled?: boolean;
}

const SearchResultsList = (
  {
    searchResults,
    isShown = true,
    value,
    setValue,
    placeholder,
    disabled = false,
  }: Props) => {
  const theme = useTheme();
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>(value as string);
  const [filteredList, setFilteredList] = useState<string[]>(searchResults);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const { debouncedValue } = useDebounce({ value: searchText, delay: 500 });

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
    setIsListOpen(searchText !== value && debouncedValue.length > 0 && searchText.length > 0);
  }, [searchText, value, debouncedValue, firstRender]);

  useEffect(() => {
    if (searchText?.length === 0) {
      setFilteredList(searchResults);
    } else {
      setFilteredList(
        searchResults.filter((result) =>
          result.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }
  }, [searchText, searchResults]);

  useEffect(() => {
    setSearchText(value as string);
  }, [value]);


  return (
    <div css={css`
      position: relative;
      height: 100%;
      animation: ${isShown ? keyframes`${theme.keyframes.slideDown}` : keyframes`${theme.keyframes.slideUp}`} 0.2s linear forwards;
    `}>
      <InputSearchItem
        value={searchText}
        setValue={setSearchText}
        placeholder={placeholder}
        errorMessage={''}
        validate={true}
        disabled={!isShown || disabled}
      />
      {isListOpen && (
        <ul css={css`
          padding: 8px 0;
          background: ${theme.colors.grey[0]};
          position: absolute;
          z-index: 1;
          top: calc(100% + 4px);
          width: 100%;
          border: 1px solid ${theme.colors.grey[700]};
          border-radius: 6px;
          display: flex;
          flex-direction: column;
        `}>
          {
            filteredList.length === 0 && (
              <li css={css`
                width: 100%;
                padding: 8px 12px 8px 12px;
                line-height: 24px;
                color: ${theme.colors.grey[500]};
              `}>
                검색 결과가 없습니다.
              </li>
            )
          }
          {filteredList.map((result, index) => (
            <li
              key={index}
              css={css`
                width: 100%;
                padding: 8px 12px 8px 12px;
                line-height: 24px;

                &:hover {
                  background: ${theme.colors.primary[50]};
                }
              `}
              onClick={() => {
                setValue(result);
                setSearchText(result);
              }}
            >
              {result.split('').map((char, index) => {
                  if (char.toLowerCase() === searchText[index]?.toLowerCase()) {
                    return <span key={index} style={{ color: theme.colors.primary[500] }}>{char}</span>;
                  }
                  return <span key={index}>{char}</span>;
                },
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResultsList;
