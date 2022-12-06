<script>
  import classnames from 'classnames';
  import ScCheckbox from '../sc-checkbox';

  export let prefixCls = 'ant-checkbox';
  export let indeterminate = false;

  let hasSlot = !!$$props.$$slot;
  let checkboxRef;

  const classString = classnames(className, {
    [`${prefixCls}-wrapper`]: true,
  });

  $: checkboxClass = classnames({
    [`${prefixCls}-indeterminate`]: indeterminate,
  })
</script>

<label
  class={classString}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
>
  <ScCheckbox
    {...checkboxProps}
    prefixCls={prefixCls}
    class={checkboxClass}
    bind:this={checkboxRef}
  />
</label>