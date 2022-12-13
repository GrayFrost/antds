<script>
  import classnames from 'classnames';
  import { onDestroy } from 'svelte';
  import { formatStyle } from '../_util/styleToString';
  import UnitNumber from './unit-number.svelte';
  
  function getOffset(start, end, unit) {
    let index = start;
    let offset = 0;

    while ((index + 10) % 10 !== end) {
      index += unit;
      offset += unit;
    }

    return offset;
  }

  export let prefixCls;
  export let value;
  export let count;

  $: originValue = Number(value);
  $: originCount = Math.abs(count);

  let state = {
    prevValue: originValue,
    prevCount: originCount,
  }

  const onTransitionEnd = () => {
    const newState = {
      prevValue: originValue,
      prevCount: originCount,
    }
    state = newState;
  };

  let timeout;

  $: if (originalValue) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      onTransitionEnd();
    }, 1000);
  }

  onDestroy(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  const offsetStyle = {};
</script>

<span
  class={`${prefixCls}-only`}
  style={formatStyle(offsetStyle)}
  ontransitionend={() => onTransitionEnd()}>

</span>