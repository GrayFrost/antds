<script>
  import warning from '../_util/warning';
  export let ellipsis;

  $: {
    warning(
      typeof ellipsis !== 'object' || !ellipsis || (!('expandable' in ellipsis) && !('rows' in ellipsis)),
      'Typography.Text',
      '`ellipsis` do not support `expandable` or `rows` props.',
    );
  }
</script>