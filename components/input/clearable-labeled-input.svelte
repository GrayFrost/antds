<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from '../icon';

  const dispatch = createEventDispatcher();
  const ClearableInputType = ['text', 'input'];

  export let prefixCls;
  export let inputType;
  export let value;
  export let defaultValue;
  export let allowClear = undefined;
  export let element;
  export let disabled = undefined;
  export let direction;
  export let size;
  export let suffix;
  export let prefix;
  export let addonBefore;
  export let addonAfter;
  export let readonly = undefined;
  export let focused = undefined;
  export let bordered = true;
  export let hidden;

  let containerRef;

  function onInputMouseUp(e) {
    if (containerRef.contains(e.target)) {
      dispatch('triggerFocus');
    }
  }
</script>