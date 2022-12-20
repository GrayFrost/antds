<script>
  import { formatStyle } from '../../_util/styleToString';

  export let prefixCls;
  export let visible;
  export let zIndex;
  export let mask;

  $: divStyle = { zIndex }
</script>

{#if mask}
  {#if visible}
    <div style={formatStyle(divStyle)} class={`${prefixCls}-mask`} />
  {/if}
{/if}