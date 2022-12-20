<script>
  import { onDestroy, onMount, afterUpdate, tick } from 'svelte';
  import { formatStyle } from '../_util/styleToString';
  import classnames from 'classnames';
  import debounce from 'lodash-es/debounce';
  import SpinIndicator from './spin-indicator.svelte';

  export let prefixCls = 'ant-spin';
  export let spinning = true;
  export let size;
  export let wrapperClassName;
  export let tip;
  export let delay;
  export let style = {};
  let className;
  export {className as class};
  export let direction;


  function shouldDelay(spinning, delay) {
    return !!spinning && !!delay && !isNaN(Number(delay));
  }

  let sSpinning;
  $: {
    sSpinning = spinning && !shouldDelay(spinning, delay);
  } 

  let originalUpdateSpinning = null;
  $: console.log('zzh spiingnsns', spinning, sSpinning);

  let updateSpinning = () => {
    if (sSpinning !== spinning) {
      sSpinning = spinning;
    }
  }
  originalUpdateSpinning = updateSpinning;

  function cancelExistingSpin() {
    if (updateSpinning && updateSpinning.cancel) {
      updateSpinning.cancel();
    }
  }

  function debouncifyUpdateSpinning() {
    if (delay) {
      cancelExistingSpin();
      updateSpinning = debounce(originalUpdateSpinning, delay);
    }
  }

  onMount(() => {
    updateSpinning();
    debouncifyUpdateSpinning();
  });

  const changeUpdate = async () => {
    await tick();
    debouncifyUpdateSpinning();
    updateSpinning();
  }

  afterUpdate(() => {
    changeUpdate();
  })

  onDestroy(() => {
    cancelExistingSpin();
  })

  $: hasDefaultSlot = !!$$slots.default;
  $: hasTipSlot = !!$$slots.tip;
  $: hasIndicatorSlot = !!$$slots.indicator;
  $: showTip = hasTipSlot || tip;
  $: containerClassName = classnames({
    [`${prefixCls}-container`]: true,
    [`${prefixCls}-blur`]: sSpinning,
  });
  $: spinClassName = classnames({
    [prefixCls]: true,
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-spinning`]: sSpinning,
    [`${prefixCls}-show-text`]: !!tip,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  }, className);

  function childClass(node) {
    let child = node.children[0];
    if (child) {
      child.classList.add(`${prefixCls}-dot`);
    }
  }
</script>

{#if hasDefaultSlot}
  <div class={classnames(`${prefixCls}-nested-loading`, wrapperClassName)}>
    <div>
      {#if sSpinning}
        <div {...$$restProps} style={formatStyle(style)} class={spinClassName}>
          {#if hasIndicatorSlot}
            <span use:childClass>
              <slot name="indicator" />
            </span>
          {:else}
            <SpinIndicator prefixCls={prefixCls} />
          {/if}
          {#if showTip}
            {#if hasTipSlot}
              <slot name="tip" />
            {:else}
              <div class={`${prefixCls}-text`}>{tip}</div>
            {/if}
          {/if}
        </div>
      {/if}
    </div>
    <div class={containerClassName}>
      <slot />
    </div>
  </div>
{:else}
  <div {...$$restProps} style={formatStyle(style)} class={spinClassName}>
    {#if hasIndicatorSlot}
      <span use:childClass>
        <slot name="indicator" />
      </span>
    {:else}
      <SpinIndicator prefixCls={prefixCls} />
    {/if}
    {#if showTip}
      {#if hasTipSlot}
        <slot name="tip" />
      {:else}
        <div class={`${prefixCls}-text`}>{tip}</div>
      {/if}
    {/if}
  </div>
{/if}