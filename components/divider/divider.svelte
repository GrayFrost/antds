<script>
  import classNames from 'classnames';

  export let prefixCls = 'ant';
  export let type = 'horizontal';
  export let orientation = '';
  let className = undefined;
  export { className as class };
  export let dashed = undefined;

  const restProps = $$restProps;
  const orientationPrefix = (orientation.length > 0) ? '-' + orientation : orientation;
  let hasSlot = !!$$props.$$slots;

  $: dividerProps = {
    class: classNames(
      className,
      `${prefixCls}-divider`,
      `${prefixCls}-divider-${type}`, {
      [`${prefixCls}-divider-with-text${orientationPrefix}`]: hasSlot,
      [`${prefixCls}-divider-dashed`]: !!dashed,
    })
  }
  let innerClass = `${prefixCls}-divider-inner-text`;

</script>

<div {...dividerProps} {...restProps}>
  {#if hasSlot}
    <span class={innerClass}>
      <slot />
    </span>
  {/if}
</div>