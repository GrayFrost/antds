import classnames from 'classnames';

export function getInputClassName(
  prefixCls: string,
  bordered: boolean,
  size?,
  disabled?: boolean,
  direction?,
) {
  return classnames(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-borderless`]: !bordered,
  });
}