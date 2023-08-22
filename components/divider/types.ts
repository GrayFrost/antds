export interface DividerProps {
  prefixCls?: string;
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | '';
  orientaionMargin?: string | number;
  class?: string;
  rootClass?: string;
  dashed?: boolean;
  style?: string;
  plain?: boolean;
}