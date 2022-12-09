<script>
  import Basic from './basic.svelte';
  let prefixCls = 'ant-layout-header';
</script>

<Basic prefixCls={prefixCls} {...$$restProps}>
  <slot />
</Basic>
