export interface BackTopProps {
  visibilityHeight?: number;
  click?: (e: MouseEvent) => void;
  target?: () => HTMLElement | Window;
  prefixCls?: string;
  className?: string;
}