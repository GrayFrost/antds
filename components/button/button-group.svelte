<script>
  import classnames from 'classnames';

  export let size = undefined;
  export let prefixCls = 'ant-btn-group';
  export let style = {};
  let className = undefined;
  export { className as class };

  $: sizeCls = size === 'large' ? 'lg' : size === 'small' ? 'sm' : '';

  $: classes = classnames(prefixCls, {
    [`${prefixCls}-${sizeCls}`]: sizeCls,
  }, className);
</script>

<div
  {...$$restProps}
  class={classes}
>
  <slot />
</div>

