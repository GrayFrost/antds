<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quintOut, cubicInOut } from 'svelte/easing';
  import classnames from 'classnames';

  const dispatch = createEventDispatcher();

  export let transitionName = '';

  $: enter = `${transitionName}-enter`; // enter start
  $: active = `${transitionName}-active`; // enter end, leave start
  $: leave = `${transitionName}-leave`; // leave end

  let startName;
  let endName;


  const onEnterStart = () => {
    dynamicTransitionClass = enter;
  };

  const onEnterEnd = () => {
    dynamicTransitionClass = active;
  };

  const onLeaveStart = () => {
    console.log('zzh leave start');
    dynamicTransitionClass = leave;
  }

  const onLeaveEnd = () => {
    console.log('zzh leave end');
    dynamicTransitionClass = leave;
    dispatch('end');
  }

  $: classes = classnames(transitionName, dynamicTransitionClass);

//transition:slide="{{duration: 300, easing: cubicInOut }}"
</script>

<div
  class={classes}
  out:slide="{{duration: 300, easing: cubicInOut}}"
  on:introstart={onEnterStart}
  on:introend={onEnterEnd}
  on:outrostart={onLeaveStart}
  on:outroend={onLeaveEnd}
>
  <slot />
</div>