<script>
  import classnames from 'classnames';
  import { useProvideSider } from './context';

  export let prefixCls;
  export let hasSider = undefined;
  let className;
  export { className as class }

  let siders = [];

  useProvideSider({
    addSider: (id) => {
      siders = [...siders, id];
    },
    removeSider: (id) => {
      siders = siders.filter(currentId => currentId !== id);
    },
  });
  
  console.log('zzh siders', siders);
  const restProps = $$restProps;
  $: divCls = classnames(className, prefixCls, {
    [`${prefixCls}-has-sider`]: hasSider || siders.length > 0,
  });
</script>

<div class={divCls} {...restProps}>
  <slot />
</div>