<script>
  import classNames from 'classnames';
  import { createEventDispatcher } from 'svelte';
  import { formatStyle } from '../_util/styleToString';
  import { PresetColorTypes, PresetStatusColorTypes } from '../_util/colors';
  import Icon from '../icon';

  const dispatch = createEventDispatcher();

  const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);
  const PresetStatusColorRegex = new RegExp(`^(${PresetStatusColorTypes.join('|')})$`);

  export let prefixCls = 'ant-tag';
  export let color;
  export let closable = false;
  export let visible = undefined;
  export let direction;

  let _visible = true;
  $: {
    if (visible !== undefined) {
      _visible = visible;
    }
  }

  function handleCloseClick(e) {
    e.stopPropagation();
    dispatch('updateVisible', false);
    dispatch('close', e);
    if (e.defaultPrevented) {
      return;
    }
    if (visible === undefined) {
      _visible = false;
    }
  }

  $: isPresetColor = (() => {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color) || PresetStatusColorRegex.test(color);
  })();

  $: tagClassName = classNames(prefixCls, {
    [`${prefixCls}-${color}`]: isPresetColor,
    [`${prefixCls}-has-color`]: color && !isPresetColor,
    [`${prefixCls}-hidden`]: !_visible,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  $: tagStyle = {
    backgroundColor: color && !isPresetColor ? color : undefined,
  }
</script>

<span class={tagClassName} style={formatStyle(tagStyle)}>
  {#if $$slots.icon}
    <slot name="icon" />
  {/if}
  <slot />
  {#if closable}
    {#if $$slots.closeIcon}
      <span class={`${prefixCls}-close-icon`} on:click={handleCloseClick}>
        <slot name="closeIcon" />
      </span>
    {:else}
      <Icon class={`${prefixCls}-close-icon`} type="close" on:click={handleCloseClick} />
    {/if}
  {/if}
</span>