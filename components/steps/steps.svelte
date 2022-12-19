<script>
  import { createEventDispatcher } from 'svelte';
  import classnames from 'classnames';
  import ScSteps, { Step as ScStep } from '../sc-steps';

  const dispatch = createEventDispatcher();

  export let current = 0;
  export let responsive = true;
  export let labelPlacement = 'horizontal';
  export let direction;
  export let prefixCls = 'ant-steps';
  export let iconPrefix = '';
  export let initial;
  export let percent;
  export let status;
  export let size;
  export let type;

  function handleChange(current) {
    dispatch('updateCurrent', current);
    dispatch('change', current)
  }

  $: stepsClassName = classnames(prefixCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-with-progress`]: percent !== undefined,
  });

</script>

<ScSteps
  {...$$props}
  prefixCls={prefixCls}
  iconPrefix={iconPrefix}
  direction={direction}
  class={stepsClassName}
>
  <slot />
</ScSteps>