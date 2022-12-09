import { setContext, getContext } from 'svelte';

export interface CheckboxContext {
  checkboxGroup: {
    toggleOption: (option) => void;
    value: any;
    disabled: boolean;
  }
}

export const CheckboxContextKey = Symbol('checkboxContextKey');

const useProvideCheckbox = (state: CheckboxContext) => {
  setContext(CheckboxContextKey, state);
}

const useConsumeCheckbox = (): CheckboxContext => {
  return getContext(CheckboxContextKey);
}

export { useProvideCheckbox, useConsumeCheckbox };