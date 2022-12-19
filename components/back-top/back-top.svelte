<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition'
  import classnames from 'classnames';
  import Icon from '../icon';
  import addEventListener from '../sc-util/Dom/addEventListener';
  import getScroll from '../_util/getScroll';
  import scrollTo from '../_util/scrollTo';
  import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';

  const dispatch = createEventDispatcher();

  export let visibilityHeight = 400;
  export let duration = 450;
  export let target;
  export let direction;
  export let prefixCls = 'ant-back-top';
  let className;
  export { className as class }
  let oldTarget = target;

  let visible = false;
  let scrollEvent = null;

  const getDefaultTarget = () => window;

  const scrollToTop = (e) => {
    scrollTo(0, {
      getContainer: target || getDefaultTarget,
      duration,
    })
  }

  const handleScroll = throttleByAnimationFrame(e => {
    const scrollTop = getScroll(e.target, true);
    visible = scrollTop > visibilityHeight;
  });

  const bindScrollEvent = () => {
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    console.log('zzh bindscrollevbent', container);
    scrollEvent = addEventListener(container, 'scroll', (e) => {
      handleScroll({
        target: container,
      });
    });
    handleScroll({
      target: container,
    })
  }

  const scrollRemove = () => {
    if (scrollEvent) {
      scrollEvent.remove();
    }
    handleScroll.cancel();
  }

  $: {
    if (oldTarget !== target) {
      scrollRemove();
      bindScrollEvent();
    }
    oldTarget = target;
  }

  onMount(() => {
    bindScrollEvent();
  });

  onDestroy(() => {
    scrollRemove();
  });

  $: divClass = classnames({
    [`${prefixCls}`]: true,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  }, className);

  $: hasSlot = !!$$slots.default;

</script>

{#if visible}
  <div
    class={divClass}
    on:click={scrollToTop}
    {...$$restProps}
    out:fade="{{duration: 200}}"
    in:fade="{{duration: 200}}">
    {#if hasSlot}
      <slot />
    {:else}
      <div class={`${prefixCls}-content`}>
        <div class={`${prefixCls}-icon`}>
          <Icon type="vertical-align-top" />
        </div>
      </div>
    {/if}
  </div>
{/if}
