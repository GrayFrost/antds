<script>
  import classnames from 'classnames';
  import { formatStyle } from '../_util/styleToString';

  export let current;
  export let prefixCls;
  export let value;
  export let offset = 0;

  let style = {};

  $: {
    if (offset) {
      style = {
        position: 'absolute',
        top: `${offset}00%`,
        left: 0,
      }
    }
  }

</script>

<p class={classnames(`${prefixCls}-only-unit`, {
  current,
})} style={formatStyle(style)}>
  {value}
</p>

