<script>
  import classnames from 'classnames';
  import { formatStyle } from '../../_util/styleToString';
  export let zIndex;
  export let visible;
  export let prefixCls;
  export let mobile = { popupClassName: '', popupStyle: {} }

  $: mergedStyle = {
    zIndex,
    ...mobile.popupStyle,
  }
  $: mergedClassName = classnames(prefixCls, mobile.popupClassName);
  // TODO: multi children wrap and single children wrap
  // TODO: transition

</script>

{#if visible}
  <div
    class={mergedClassName}
    style={formatStyle(mergedStyle)}
  >
    <div class={`${prefixCls}-content`}>
      <slot />
    </div>
  </div>
{/if}