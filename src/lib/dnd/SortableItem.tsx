import React, { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from '@emotion/react';

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {}
});

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li
        css={css`
          position: relative;
          display: flex;
          gap: 0.25rem;
          align-items: center;
        `}
        ref={setNodeRef}
        style={style}
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <button
      ref={ref}
      {...attributes}
      {...listeners}
    >
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="1" fill="#B3B3B3" />
        <circle cx="9" cy="5" r="1" fill="#B3B3B3" />
        <circle cx="5" cy="11" r="1" fill="#B3B3B3" />
        <circle cx="9" cy="11" r="1" fill="#B3B3B3" />
        <circle cx="5" cy="17" r="1" fill="#B3B3B3" />
        <circle cx="9" cy="17" r="1" fill="#B3B3B3" />
      </svg>
    </button>
  );
}
