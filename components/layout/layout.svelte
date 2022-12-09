<script>
  import BasicLayout from './basic-layout.svelte';
  let prefixCls = 'ant-layout';
</script>

<BasicLayout prefixCls={prefixCls} {...$$restProps}>
  <slot />
</BasicLayout>
