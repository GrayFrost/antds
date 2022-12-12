<script>
  export let prefixCls;
  export let id;
</script>

<div class={`${prefixCls}-inner`} id={id} role="tooltip">
  <slot name="overlay" />
</div>