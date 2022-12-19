<script>
  import classnames from 'classnames';

  export let prefixCls;
  export let isActive = undefined;
  export let forceRender = undefined;
  export let role;

  let rendered = false;
  $: {
    if (isActive || forceRender) {
      rendered = true;
    }
  }
</script>

{#if rendered}
  <div
    class={classnames(`${prefixCls}-content`, {
      [`${prefixCls}-content-active`]: isActive,
      [`${prefixCls}-content-inactive`]: !isActive,
    })}
    role={role}
    >
    <div class={`${prefixCls}-content-box`}>
      <slot />
    </div>
  </div>
{/if}