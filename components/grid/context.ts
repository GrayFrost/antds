import { setContext, getContext } from 'svelte';

export interface RowContext {
  gutter: [number, number];
  wrap: boolean;
  supportFlexGap: boolean;
}

export const RowContextKey = Symbol('rowContextKey');

const useProvideRow = (state: RowContext) => {
  setContext(RowContextKey, state);
}

const useConsumeRow = (): RowContext => {
  return getContext(RowContextKey);
}

export { useProvideRow, useConsumeRow };