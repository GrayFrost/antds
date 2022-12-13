<script>
  import antInputDirective from '../_util/antInputDirective';
  import classnames from 'classnames';
  import ClearableLabeledInput from './clearable-labeled-input.svelte';

  function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return String(value);
  }
</script>