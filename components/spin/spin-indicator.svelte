<script>
  export let prefixCls;

  $: dotClassName = `${prefixCls}-dot`;
</script>

<span class={`${dotClassName} ${prefixCls}-dot-spin`}>
  <i class={`${prefixCls}-dot-item`} />
  <i class={`${prefixCls}-dot-item`} />
  <i class={`${prefixCls}-dot-item`} />
  <i class={`${prefixCls}-dot-item`} />
</span>

