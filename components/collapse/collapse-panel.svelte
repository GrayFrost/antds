<script>
  import { createEventDispatcher } from 'svelte';
  import PanelContent from './panel-content.svelte';
  import classnames from 'classnames';
  import devWarning from '../sc-util/devWarning';

  const dispatch = createEventDispatcher();

  export let prefixCls;
  export let headerClass = '';
  export let showArrow = true;
  export let isActive = false;
  export let destroyInactivePanel = undefined;
  export let accordion = undefined;
  export let forceRender = false;
  export let panelKey;
  export let collapsible;
  export let role;
  let className;
  export { className as class }

  const handleItemClick = () => {
    dispatch('itemClick', panelKey);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
      handleItemClick();
    }
  }

  const handleHeaderClick = () => {
    if (collapsible !== 'header') {
      handleItemClick();
    }
  }

  $: disabled = collapsible === 'disabled';
  $: headerCls = classnames(`${prefixCls}-header`, {
    [headerClass]: headerClass,
    [`${prefixCls}-header-collapsible-only`]: collapsible === 'header',
  });
  $: itemCls = classnames({
    [`${prefixCls}-item`]: true,
    [`${prefixCls}-item-active`]: isActive,
    [`${prefixCls}-item-disabled`]: disabled,
    [`${prefixCls}-no-arrow`]: !showArrow,
    [`${className}`]: !!className,
  });

  $: extraSlot = !!$$slots.extra;
  $: expandIconSlot = !!$$slots.expandIcon;
</script>

<div class={itemCls}>
  <div
    class={headerCls}
    on:click={handleHeaderClick}
    role={accordion ? 'tab' : 'button'}
    tabindex={disabled ? -1 : 0}
    aria-expanded={isActive}
    on:keypress={handleKeyPress}
  >
    {#if showArrow}
      {#if expandIconSlot}
        <slot name="expandIcon" />
      {:else}
        <i class="arrow" />
      {/if}
    {/if}
    {#if collapsible === 'header'}
      <span on:click={handleItemClick} class={`${prefixCls}-header-text`}>
        <slot name="header" />
      </span>
    {:else}
      <slot name="header" />
    {/if}
    {#if extraSlot}
      <div class={`${prefixCls}-extra`}>
        <slot name="extra" />
      </div>
    {/if}
  </div>
  {#if !destroyInactivePanel || isActive}
    {#if isActive}
      <PanelContent
        prefixCls={prefixCls}
        isActive={isActive}
        forceRender={forceRender}
        role={accordion ? 'tabpanel' : null}
      ><slot /></PanelContent>
    {/if}
  {/if}
</div>