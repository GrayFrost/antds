<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { circInOut} from 'svelte/easing';
  import classnames from 'classnames';
  import Icon from '../icon';
  import Animate from './animate.svelte';

  function getPropsSlot(slots, props, prop = 'default') {
    if (props && props[prop]) {
      return props[prop];
    }
    if (slots && slots[prop]) {
      return slots[prop];
    }
    return null;
  }

  export let type = undefined;
  export let closable = undefined;
  export let closeText = undefined;
  export let message;
  export let showIcon = undefined;
  export let iconType = undefined;
  export let style = undefined;
  export let prefixCls = 'ant-alert';
  let className = undefined;
  export { className as class };
  export let banner = undefined;
  export let direction = undefined;
  export let description = undefined;

  let dispatch = createEventDispatcher();

  let closing = false;
  let closed = false;
  let alertRef;

  const handleClose = (e) => {
    e.preventDefault();
    const dom = alertRef;
    // dom.style.height = `${dom.offsetHeight}px`;
    //   // Magic code
    //   // 重复一次后才能正确设置 height
    // dom.style.height = `${dom.offsetHeight}px`;
    closing = true;
    // closed = true;
    dispatch('close', e);
  }

  export const animationEnd = () => {
    closing = false;
    closed = true;
    dispatch('afterClose');
  }

  const slots = $$props.$$slots;
  const props = $$props;
  const closeTextData = getPropsSlot(slots, props, 'closeText');
  const descriptionData = getPropsSlot(slots, props, 'description');
  const messageData = getPropsSlot(slots, props, 'message');

  // banner模式默认有 Icon
  showIcon = banner && showIcon === undefined ? true : showIcon;
  // banner模式默认为警告
  type = banner && type === undefined ? 'warning' : type || 'info';

  let iconTheme = 'filled';
  if (!iconType) {
    switch (type) {
      case 'success':
        iconType = 'check-circle';
        break;
      case 'info':
        iconType = 'info-circle';
        break;
      case 'error':
        iconType = 'close-circle';
        break;
      case 'warning':
        iconType = 'exclamation-circle';
        break;
      default:
        iconType = 'default';
    }

    // use outline icon in alert with description
    if (!!description) {
      iconTheme = 'outlined';
    }
  }

  // closeable when closeText is assigned
  if (closeTextData) {
    closable = true;
  }

  // animate class
  $: motionClass = {
    [`${prefixCls}-motion-leave`]: true,
    [`${prefixCls}-motion-leave-active`]: closing,
  }

  $: alertCls = classnames(prefixCls, {
    [`${prefixCls}-${type}`]: true,
    [`${prefixCls}-with-description`]: !!descriptionData,
    [`${prefixCls}-no-icon`]: !showIcon,
    [`${prefixCls}-banner`]: !!banner,
    [`${prefixCls}-closable`]: closable,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  }, motionClass);

  const hasCloseTextSlot = !!slots?.closeText;
  const hasMessageSlot = !!slots?.message;
  const hasDescriptionSlot = !!slots?.description;
  const hasIconSlot = !!slots?.icon;
  const hasCloseIconSlot = !!slots?.closeIconSlot;

  let hide = false;

  $: testClass = classnames(prefixCls, 'test', 
    `${prefixCls}-motion-leave`, {
    [`${prefixCls}-motion-leave-active`]: hide,
  });
  const testHide = () => {
    hide = true;
  }
</script>

<div class={testClass} on:click={testHide}>test</div>
{#if closed}
  {""}
{:else}
<!-- <Animate transitionName={`${prefixCls}-motion`} on:end={animationEnd}> -->
  <div
    bind:this={alertRef}
    data-show={!closing}
    class={alertCls}
    style={style}
  >
    {#if showIcon}
      {#if hasIconSlot}
        <slot name="icon" />
      {:else}
        <Icon class={`${prefixCls}-icon`} type={iconType} theme={iconTheme} />
      {/if}
    {/if}
    <div class={`${prefixCls}-content`}>
      {#if messageData}
        {#if hasMessageSlot}
          <slot name="message" />
        {:else}
          <div class={`${prefixCls}-message`}>{message}</div>
        {/if}
      {/if}
      {#if descriptionData}
        {#if hasDescriptionSlot}
          <slot name="description" />
        {:else}
          <div class={`${prefixCls}-description`}>{description}</div>
        {/if}
      {/if}
    </div>
    {#if closable}
      <span on:click={handleClose} class={`${prefixCls}-close-text`}>
        {#if hasCloseTextSlot}
          <slot name="closeText" />
        {:else}
          {#if closeTextData}
            {closeText}
          {:else}
            {#if hasCloseIconSlot}
              <slot name="closeIcon" />
            {:else}
              <Icon type="close" />
            {/if}
          {/if}
        {/if}
      </span>
    {/if}
  </div>
<!-- </Animate> -->
{/if}

<style>

  .test {
    height: 30px;
    background: orange;
  }
</style>