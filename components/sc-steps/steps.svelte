<script>
  import { createEventDispatcher, setContext } from 'svelte';
  import classnames from 'classnames';
  import { writable } from 'svelte/store';
  import { ScStepsContextKey } from './context';

  const dispatch = createEventDispatcher();

  let className;
  export { className as class };
  export let type = undefined;
  export let prefixCls = 'vc-steps';
  export let iconPrefix = 'vc';
  export let direction = 'horizontal';
  export let labelPlacement = 'horizontal';
  export let status = 'process';
  export let size = '';
  export let progressDot = undefined;
  export let current = 0;

  let stepIndex = -1;
  setContext(ScStepsContextKey, {
    setIndex: () => {
      stepIndex += 1;
      return stepIndex;
    },
    prefixCls: writable(prefixCls),
    status: writable(status),
    current: writable(current),
    iconPrefix: writable(iconPrefix),
  });

  function onStepClick(next) {
    if (current !== next) {
      dispatch('change', next);
    }
  }

  $: isNav = type === 'navigation';
  $: adjustedLabelPlacement = progressDot ? 'vertical' : labelPlacement;
  $: classString = classnames(prefixCls, `${prefixCls}-${direction}`, {
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-label-${adjustedLabelPlacement}`]: direction === 'horizontal',
    [`${prefixCls}-dot`]: !!progressDot,
    [`${prefixCls}-navigation`]: isNav,
  })
</script>

<div class={classString}>
  <slot />
</div>