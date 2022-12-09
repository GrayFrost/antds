<script>
  import classnames from 'classnames';
  import { createEventDispatcher, afterUpdate } from 'svelte';
  import ScCheckbox from '../sc-checkbox';
  import { useConsumeCheckbox } from './context';

  const dispatch = createEventDispatcher();
  export let prefixCls = 'ant-checkbox';
  export let indeterminate = false;
  export let checked = false;
  export let disabled = false;
  let className = undefined;
  export {className as class};
  export let style = {};
  export let value = undefined;

  let hasSlot = !!$$props.$$slots;
  let checkboxRef;
  const { checkboxGroup } = useConsumeCheckbox() || {};
  let checkboxProps = {};
  $: {
    const _checkboxProps = { checked, disabled, ...$$restProps };
    if (checkboxGroup) {
      _checkboxProps.checked = checkboxGroup.value.indexOf(value) !== -1;
      _checkboxProps.disabled = disabled || checkboxGroup.disabled;
    }
    checkboxProps = _checkboxProps;
  }

  $: classString = classnames(className, {
    [`${prefixCls}-wrapper`]: true,
  });

  $: checkboxClass = classnames({
    [`${prefixCls}-indeterminate`]: indeterminate,
  });

  export const focus = () => {
    checkboxRef && checkboxRef.focus();
  };

  export const blur = () => {
    checkboxRef && checkboxRef.blur();
  };

  const onChange = (e) => {
    if (checkboxGroup) {
      checkboxGroup.toggleOption({value: value});
    } else {
      dispatch('change', e.detail);
    }
  }
</script>

<label
  class={classString}
  on:mouseenter
  on:mouseleave
>
  <ScCheckbox
    {...checkboxProps}
    prefixCls={prefixCls}
    class={checkboxClass}
    bind:this={checkboxRef}
    on:change={onChange}
  />
  {#if hasSlot}
    <span><slot /></span>
  {/if}
</label>