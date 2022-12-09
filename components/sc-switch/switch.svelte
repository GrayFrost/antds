<script>
  import classnames from 'classnames';
  import KeyCode from '../_util/KeyCode';
  import { wave } from '../_util/wave';

  export let prefixCls = 'sc-switch';
  export let disabled;
  export let onChange;
  export let onKeyDown;
  export let onClick;
  export let tabIndex;
  export let checked;
  export let defaultChecked;
  export let title;
  let className = '';
  export {className as class}

  let innerChecked = checked !== undefined ? checked : defaultChecked !== undefined ? defaultChecked : false;

  function triggerChange(newChecked, event) {
    let mergeChecked = innerChecked;
    if (!disabled) {
      mergeChecked = newChecked;
      innerChecked = mergeChecked;
      onChange && onChange(mergeChecked, event.detail);
    }
    return mergeChecked;
  }

  export function onInternalClick(e) {
    const ret = triggerChange(!innerChecked, e);
    onClick && onClick(ret, e.detail);
  }

  export function onInternalKeyDown(e) {
    if (e.which === KeyCode.LEFT) {
      triggerChange(false, e);
    } else if (e.which === KeyCode.RIGHT) {
      triggerChange(true, e);
    }
    onKeyDown && onKeyDown(e.detail);
  }

  $: switchClassName = classnames(prefixCls, className, {
    [`${prefixCls}-checked`]: innerChecked,
    [`${prefixCls}-disabled`]: disabled,
  });

  const defaultProps = {
    prefixCls,
    title,
    tabIndex,
  };
</script>

<button
  {...defaultProps}
  {...$$props}
  type="button"
  role="switch"
  aria-checked={innerChecked}
  disabled={disabled}
  class={switchClassName}
  on:keydown={onInternalKeyDown}
  on:click={onInternalClick}
  use:wave
  data-insert="true"
>
  <slot name="loadingIcon" />
  <span class={`${prefixCls}-inner`}>
    {#if innerChecked}
      <span class={`${prefixCls}-inner-checked`}>
        <slot name="checkedChildren" />
      </span>
    {:else}
      <span class={`${prefixCls}-inner-unchecked`}>
        <slot name="unCheckedChildren" />
      </span>
    {/if}
  </span>
</button>

