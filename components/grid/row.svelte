<script>
  import { onMount, onDestroy } from 'svelte';
  import classnames from 'classnames';
  import ResponsiveObserve, { responsiveArray } from '../_util/responsiveObserve';
  import { detectFlexGapSupported } from '../_util/styleChecker';
  import { styleToString } from '../_util/styleToString';
  import { useProvideRow } from './context';

  export let gutter = 0;
  export let align = undefined;
  export let justify = undefined;
  export let prefixCls = 'ant-row';
  export let wrap = undefined;
  export let direction = undefined;

  let screens = {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
    xxxl: true,
  };

  let supportFlexGap;
  let token;

  supportFlexGap = detectFlexGapSupported();

  token = ResponsiveObserve.subscribe(screen => {
      const currentGutter = gutter || 0;
      if (
        (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
        (Array.isArray(currentGutter) &&
          (typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'))
      ) {
        screens = screen;
      }
    });

  onDestroy(() => {
    ResponsiveObserve.unsubscribe(token);
  })

  $: classes = classnames(prefixCls, {
    [`${prefixCls}-no-wrap`]: wrap === false,
    [`${prefixCls}-${justify}`]: justify,
    [`${prefixCls}-${align}`]: align,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  })

  const computedRowStyle = () => {
    const gt = gutter;
    // Add gutter related style
    const style= {};
    const horizontalGutter = gt[0] > 0 ? `${gt[0] / -2}px` : undefined;
    const verticalGutter = gt[1] > 0 ? `${gt[1] / -2}px` : undefined;

    if (horizontalGutter) {
      style['margin-left'] = horizontalGutter;
      style['margin-right']= horizontalGutter;
    }

    if (supportFlexGap) {
      // Set gap direct if flex gap support
      style['row-gap'] = `${gt[1]}px`;
    } else if (verticalGutter) {
      style['margin-top'] = verticalGutter;
      style['margin-bottom'] = verticalGutter;
    }
    return style;
  }
  $: rowStyle = styleToString(computedRowStyle());

  const computedGutter = () => {
    const results = [0, 0];
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint = responsiveArray[i];
          if (screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint];
            break;
          }
        }
      } else {
        results[index] = g || 0;
      }
    });
    return results;
  }

  $: gutter = computedGutter();

  useProvideRow({
    gutter,
    supportFlexGap,
    wrap,
  })

</script>

<div class={classes} style={rowStyle}>
  <slot />
</div>