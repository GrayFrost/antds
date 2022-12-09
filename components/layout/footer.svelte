<script>
  import Basic from './basic.svelte';
  let prefixCls = 'ant-layout-footer';
</script>

<Basic prefixCls={prefixCls} {...$$restProps}>
  <slot />
</Basic>