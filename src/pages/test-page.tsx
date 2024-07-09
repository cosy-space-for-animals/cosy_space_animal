'use client';

import React, { useEffect } from 'react';
import { convertUnit, copyToClipboard, validatePassword } from '@/utils/common';
import fetchWrapper from '@/utils/fetchWrapper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { css } from '@emotion/react';
import Observer from '@/components/Observer';

type TTodo = {
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  todos: TTodo[];
};

export const getServerSideProps = async () => {
  const todos = await fetchWrapper('/todos/1');

  return {
    props: {
      todos: [todos],
    },
  };
};

const TestPage = ({ todos }: Props) => {
  const [list, setList] = React.useState<TTodo[]>(todos);
  const [maxPages, setMaxPages] = React.useState<number>(5);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: ({ pageParam }) => fetchWrapper(`/todos/${pageParam}`),
    initialPageParam: 2,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      if (lastPageParam === maxPages) {
        return null;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam === 2) {
        return null;
      }
      return firstPageParam - 1;
    },
    maxPages: 5,
  });


  const test = async () => {
    await copyToClipboard('test');
  };

  const testNum = 12345;

  return (
    <>
      <div>
        <h1>Test Page</h1>
        <button onClick={test}>Copy</button>
        <div>{convertUnit(testNum)}</div>
      </div>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          flex-direction: column;
          align-items: center;
        `}
      >
        {list.map((todo) => (
          <div
            key={todo.id}
            css={css`
              height: 100dvh;
              padding: 20px;
              border: 1px solid var(--grey-300);
              border-radius: 8px;
              width: 300px;
            `}
          >
            <h2>{todo.title}</h2>
            <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
          </div>
        ))}
        <Observer
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isPending={isFetchingNextPage}
        />
      </div>
    </>
  );
};

export default TestPage;
