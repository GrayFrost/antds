<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import classnames from 'classnames';

  export let prefixCls = 'rc-checkbox';
  export let name;
  export let id;
  export let type = 'checkbox';
  export let title = '';
  export let defaultChecked = false;
  export let checked = undefined;
  export let disabled;
  export let tabindex;
  export let readonly;
  export let autofocus;
  export let value;
  export let required;
  let className;
  export { className as class };

  let inputRef;
  const dispatch = createEventDispatcher();
  let _checked = checked !== undefined ? checked : defaultChecked;

  export const focus = () => {
    inputRef && inputRef.focus();
  }

  export const blur = () => {
    inputRef && inputRef.blur();
  }

  const handleChange = (e) => {
    if (disabled) {
      return;
    }

    if (!(checked !== undefined)) {
      _checked = e.target.checked;
    }

    dispatch('change', {
      target: {
        ...$$props,
        checked: _checked,
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      }
    })
  }

  $: classString = classnames(
    prefixCls,
    className, {
    [`${prefixCls}-checked`]: checked,
    [`${prefixCls}-disabled`]: disabled,
  });

  const onClick = (e: MouseEvent) => {
    dispatch('click', e);
  }

  const onFocus = (e: FocusEvent) => {
    dispatch('focus', e);
  }

  const onBlur = (e: FocusEvent) => {
    dispatch('blur', e);
  }

  const onKeyUp = (e: KeyboardEvent) => {
    dispatch('keyup', e);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    dispatch('keydown', e);
  }

  const onKeyPress = (e: KeyboardEvent) => {
    dispatch('keypress', e);
  }
  // TODO: 剩余input事件
</script>

<span class={classString}>
  <input
    bind:this={inputRef}
    name={name}
    id={id}
    type={type}
    title={title}
    required={required}
    readonly={readonly}
    disabled={disabled}
    tabindex={tabindex}
    class={`${prefixCls}-input`}
    checked={!!_checked}
    value={value}
    on:click={onClick}
    on:change={handleChange}
    on:focus={onFocus}
    on:blur={onBlur}
    on:keyup={onKeyUp}
    on:keydown={onKeyDown}
    on:keypress={onKeyPress}
    {...$$restProps}
  />
  <span class={`${prefixCls}-inner`}></span>
</span>