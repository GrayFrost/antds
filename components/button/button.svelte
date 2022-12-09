<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate, beforeUpdate } from 'svelte';
  import classnames from 'classnames';
  import Icon from '../icon';
  import { wave } from '../_util/wave';
  import { fixTwoCNChar } from './fixTwoCNChar';

  const dispatch = createEventDispatcher();

  export let prefixCls = 'ant-btn';
  export let loading = false;
  export let ghost = false;
  export let block = false;
  export let type = undefined;
  export let shape = undefined;
  export let size = undefined;
  let className = undefined;
  export { className as class };
  export let icon = undefined;

  const restProps = $$restProps;
  const { htmlType, ...otherProps } = restProps;

  let buttonRef;

  let hasTwoCNChar = false;
  let _loading = false;
  let delayTimeout = undefined;

  $: sizeCls = size === 'large' ? 'lg' : size === 'small' ? 'sm' : '';

  $: classes = classnames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-icon-only`]: !$$slots && icon,
    [`${prefixCls}-loading`]: _loading,
    [`${prefixCls}-background-ghost`]: ghost,
    [`${prefixCls}-block`]: block,
  });

  $: iconType = _loading ? 'loading' : icon;

  

  const handleClick = (e) => {
    dispatch('click', e);
  }

  const insertSpace = (child, needInserted) => {

  }

  $: {
    if (loading) {
      clearTimeout(delayTimeout)
    }

    if (typeof _loading !== 'boolean' && _loading && _loading.delay) {
      this.delayTimeout = window.setTimeout(() => {
        _loading = loading;
      }, _loading.delay);
    } else {
      _loading = loading;
    }
  }

</script>

{#if ('href' in restProps)}
  <a {...restProps} class={classes} on:click={handleClick}>
    {#if iconType}
      <Icon type={iconType} />
    {:else}
      <span data-prefix={prefixCls}><slot /></span>
    {/if}
  </a>
  {:else}
  <button
    {...otherProps}
    bind:this={buttonRef}
    class={classes}
    on:click={handleClick}
    use:fixTwoCNChar
    use:wave
    data-prefix={prefixCls}
  >
  {#if iconType}
    <Icon type={iconType} />
  {/if}
    <slot />
  </button>
{/if}
