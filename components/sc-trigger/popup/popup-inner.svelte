<script>
  import { createEventDispatcher } from 'svelte';
  import { formatStyle } from '../../_util/styleToString';
  import classnames from 'classnames';
  import Align from '../../sc-align';
  import supportsPassive from '../../_util/supportsPassive';

  const dispatch = createEventDispatcher();
  // TODO: stretch style
  
  let alignRef;
  let alignedClassName;
  let _visible = false;
  let timeoutId;
  let oldVisible;
  export let visible;
  export let prefixCls;
  let className = '';
  export { className as class }
  export let align;
  export let point;
  export let getRootDomNode = () => {}
  // export let destroyPopupOnHide;
  export let zIndex;
  export let style = {};

  $: {
    if (oldVisible !== visible) {
      clearTimeout(timeoutId);
      if (visible) {
        timeoutId = setTimeout(() => {
          _visible = visible;
        })
      } else {
        _visible = false;
      }
    }
  }

  $: mergedClassName = classnames(prefixCls, className, alignedClassName);
  $: hasAnimate = _visible || !visible;
  $: alignDisabled = (() => {
    if (align.points) {
      return false;
    }
    return true;
  })();

  $: mergedStyle = {
    zIndex,
    opacity: _visible ? null : 0,
    pointerEvents: !_visible ? 'none' : null,
    ...style,
  }

  const getAlignTarget = () => {
    if (point) {
      return point;
    }
    return getRootDomNode;
  };

  export const forceAlign = () => {
    if (alignRef) {
      alignRef.forceAlign();
    }
  }

// TODO: support passive
</script>

{#if _visible}
<Align
  target={getAlignTarget()}
  bind:this={alignRef}
  monitorWindowResize={true}
  disabled={alignDisabled}
  align={align}
  >
  <div
    class={mergedClassName}
    on:mouseenter={(e) => dispatch('mouseenter', e)}
    on:mouseleave={(e) => dispatch('mouseleave', e)}
    on:mousedown|capture={(e) => dispatch('mousedown', e)}
    on:touchstart|capture={(e) => dispatch('touchstart', e)}
    style={formatStyle(mergedStyle)}
  >
    <div class={`${prefixCls}-content`}>
      <slot />
    </div>
  </div>
</Align>
{/if}