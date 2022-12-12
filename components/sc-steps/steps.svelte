<script>
  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { ScStepsContextKey } from './context';

  const dispatch = createEventDispatcher();

  import classnames from 'classnames';
  export let type;
  export let prefixCls = 'vc-steps';
  export let iconPrefix = 'vc';
  export let direction = 'horizontal';
  export let labelPlacement = 'horizontal';
  export let status = 'process';
  export let size = '';
  export let progressDot;
  export let initial = 0;
  export let current = 0;
  export let icons;

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