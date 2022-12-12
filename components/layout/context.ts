import { setContext, getContext } from 'svelte';

const SiderContextKey = Symbol('SiderContextKey');

export interface SiderContext {
  addSider: (id: string) => void;
  removeSider: (id: string) => void;
}

const useProvideSider = (data: SiderContext) => {
  setContext(SiderContextKey, data);
};

const useConsumeSider = (): SiderContext => {
  return getContext(SiderContextKey);
}

const LayoutContextKey = Symbol('LayoutContextKey');

export interface LayoutContext {
  siderCollapsed: boolean;
  collapsedWidth: number;
}

const useProvideLayout = (data: LayoutContext) => {
  setContext(LayoutContextKey, data);
}

const useConsumeLayout = (): LayoutContext => {
  return getContext(LayoutContextKey);
}

export {
  useProvideSider,
  useConsumeSider,
  useProvideLayout,
  useConsumeLayout,
}