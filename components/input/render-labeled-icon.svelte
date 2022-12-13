<script>
  import classnames from 'classnames';
  import { formatStyle } from '../_util/styleToString';
  export let prefixCls;
  export let focused;
  export let value;
  export let size;
  export let disabled;
  export let allowClear;
  export let direction;
  export let readonly;
  export let bordered;
  export let hidden;

  export let style = {}

  $: affixWrapperCls = classnames()

  function onInputMouseUp() {
    
  }

</script>

<span
  class={affixWrapperCls}
  style={formatStyle(style)}
  on:mouseup={onInputMouseUp}
  hidden={hidden}
></span>