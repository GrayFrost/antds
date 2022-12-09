<script>
  import classnames from 'classnames';
  import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
  import Checkbox from './checkbox.svelte';
  import { useProvideCheckbox } from './context';

  export let prefixCls = 'ant-checkbox';
  $: groupPrefixCls = `${prefixCls}-group`;
  let className = undefined;
  export { className as class };
  export let direction = undefined;
  export let style = {};
  export let options = undefined;
  export let disabled = false;
  export let value = undefined;
  export let defaultValue = [];

  const dispatch = createEventDispatcher();

  $: classString = classnames(groupPrefixCls, {
    [`${groupPrefixCls}-rtl`]: direction === 'rtl',
  }, className);

  let mergeValue = (value === undefined ? defaultValue : value) || [];
  

  $: _options = options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        label: option,
        value: option,
      };
    }
    return option;
  });

  const toggleOption = (option) => {
    const optionIndex = mergeValue.indexOf(option.value);
    const _value = [...mergeValue];
    if (optionIndex === -1) {
      _value.push(option.value);
    } else {
      _value.splice(optionIndex, 1);
    }
    // if ($$props.value === undefined) {
    //   mergeValue = _value;
    // }
    dispatch('change', _value);
  }
  console.log('zzh value', mergeValue);
  useProvideCheckbox({
    checkboxGroup: {
      toggleOption,
      value: mergeValue,
      disabled,
    }
  });
</script>

<div class={classString} style={style}>
  {#if _options && _options.length > 0}
    {#each _options as option }
      <Checkbox
        prefixCls={prefixCls}
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : disabled}
        indeterminate={option.indeterminate}
        value={option.value}
        checked={mergeValue.indexOf(option.value) !== -1}
        on:change={option.onChange}
        class={`${groupPrefixCls}-item`}
      >
        {#if option.label === undefined}
          <slot name="label" />
        {:else}
          {option.label}
        {/if}
      </Checkbox>
    {/each}
  {/if}
  <slot />
</div>