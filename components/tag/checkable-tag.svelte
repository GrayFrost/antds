<script>
  import classnames from 'classnames';
  import { createEventDispatcher } from 'svelte';

  export let prefixCls = 'ant-tag';
  const dispatch = createEventDispatcher();

  export let checked;

  function handleClick(e) {
    dispatch('updateChecked', !checked);
    dispatch('change', !checked);
    dispatch('click', e);
  }

  $: cls = classnames(prefixCls, {
    [`${prefixCls}-checkable`]: true,
    [`${prefixCls}-checkable-checked`]: checked,
  })
</script>

<span class={cls} on:click={handleClick}>
  <slot />
</span>

