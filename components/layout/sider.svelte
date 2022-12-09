<script>
  import { onMount, onDestroy } from 'svelte';
  import classnames from 'classnames';
  import Icon from '../icon';
  import { useProvideLayout, useConsumeLayout, useConsumeSider } from './context';
  import DefaultTrigger from './default-trigger.svelte';
  import isNumeric from '../_util/isNumeric';

  export let prefixCls = 'ant-layout-sider';
  export let collapsible = false;
  export let collapsed;
  export let defaultCollapsed = false;
  export let reverseArrow;
  export let width = 200;
  export let collapsedWidth = 80;
  export let breakpoint;
  export let theme = 'dark';
  export let style = {};
  export let onBreakpoint = undefined;
  export let onCollapse = undefined;
  let className;
  export { className as class };

  const dimensionMap = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
  };

  // matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
  if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery) => {
      return {
        media: mediaQuery,
        matches: false,
        addListener() {
        },
        removeListener() {
        },
      };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
  }

  const generateId = (() => {
    let i = 0;
    return (prefix = '') => {
      i += 1;
      return `${prefix}${i}`;
    };
  })();

  let mql;
  let uniqueId;
  let below = false;
  let belowShow = false;

  uniqueId = generateId('ant-sider-');

  let matchMedia;
  if (typeof window !== 'undefined') {
    matchMedia = window.matchMedia;
  }
  if (matchMedia && breakpoint && breakpoint in dimensionMap) {
    mql = matchMedia(`(max-width: ${dimensionMap[props.breakpoint]})`);
  }
  $: _collapsed = collapsed || defaultCollapsed;

  useProvideLayout({
    siderCollapsed: _collapsed,
    collapsedWidth,
  });

  // const { addSider, removeSider } = useConsumeSider();
  console.log('zzh sider sider', useConsumeSider());

  $: {
    if (mql) {
      mql.addListener(responsiveHandler);
      responsiveHandler(mql);
    }
  }

  onMount(() => {
    if (addSider) {
      addSider && addSider(uniqueId);
    }
  })

  onDestroy(() => {
    if (mql) {
      mql.removeListener(responsiveHandler);
    }

    if (removeSider) {
      removeSider(uniqueId);
    }
  });

  function responsiveHandler(mql) {
    below = mql.matches;
    if (onBreakpoint) {
      onBreakpoint(mql.matches);
    }
    setCollapsed(mql.matches, 'responsive')
  }

  function setCollapsed(collapsed, type) {
    _collapsed = collapsed;

    if (onCollapsed) {
      onCollapsed(_collapsed, type);
    }
  }

  function toggle() {
    const collapsed = !_collapsed;
    setCollapsed(collapsed, 'clickTrigger');
  }

  function belowShowChange() {
    belowShow = !belowShow;
  }

  $: rawWidth = _collapsed ? collapsedWidth : width;
  $: siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);

  $: siderCls = classnames(className, prefixCls, `${prefixCls}-${theme}`, {
    [`${prefixCls}-collapsed`]: !!_collapsed,
    [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
    [`${prefixCls}-below`]: !!below,
    [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0,
  });

  const hasTrigger = !!$$slots.trigger;
  $: zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0;

</script>

<div
  class={siderCls}
  {...$$restProps}
  style="flex: 0 0 ${siderWidth}; max-width: {siderWidth}px; min-width: {siderWidth}px; width: {siderWidth}px;"
>
  <div class={`${prefixCls}-children`}>
    <slot />
  </div>
  {#if collapsible || (below && zeroWidthTrigger)}
    {#if hasTrigger}
      {#if zeroWidthTrigger}
      <span onClick={toggle} class={`${prefixCls}-zero-width-trigger`}>
        <Icon type="bars" />
      </span>
      {:else}
        <div
          class={`${prefixCls}-trigger`}
          on:click={toggle}
          style="width: {siderWidth}px;"
        >
          {#if hasTrigger}
            <slot name="trigger" />
          {:else}
            <DefaultTrigger reverseArrow={reverseArrow} collapsed={_collapsed} />
          {/if}
        </div>
      {/if}
    {/if}
  {/if}
</div>