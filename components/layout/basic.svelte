<script>
  import classnames from 'classnames';

  export let prefixCls = undefined;
  let className = undefined;
  export { className as class };
  const restProps = $$restProps;
  $: divCls = classnames(className, prefixCls);
</script>

<div class={divCls} {...restProps}>
  <slot />
</div>