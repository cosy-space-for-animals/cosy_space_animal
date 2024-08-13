import { css } from '@emotion/react';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface IScrimProps {
  setScrim: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Scrim: React.FC<IScrimProps> = ({ setScrim, children }) => {
  const click = useCallback(() => {
    setScrim((prev) => !prev);
  }, [setScrim]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setScrim((prev) => !prev);
    },
    [setScrim],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setScrim, handleKeyDown]);

  return (
    <div
      onClick={click}
      css={css`
        width: 100vw;
        height: 100vh;
        background: #00000080;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999999;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Scrim;
