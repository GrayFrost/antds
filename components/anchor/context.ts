import { setContext, getContext } from 'svelte';

const AnchorContextKey = Symbol('AnchorContextKey');

export interface AnchorContext {
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  activeLink: any;
  scrollTo: (link: string) => void;
  handleClick: (e: Event, info: {title: string, href: string}) => void;
}

const useProvideAnchor = (data: AnchorContext) => {
  setContext(AnchorContextKey, data)
}

const useConsumeAnchor = (): AnchorContext => {
  return getContext(AnchorContextKey);
}

export { useConsumeAnchor, useProvideAnchor }