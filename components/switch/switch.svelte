<script>
  import classnames from 'classnames';
  import Icon from '../icon';
  import ScSwitch from '../sc-switch';

  export let prefixCls = 'ant-switch';
  export let size;
  let className = '';
  export { className as class };
  export let checked = undefined;
  export let defaultChecked = false;
  export let onChange = function(checked) {}
  export let disabled = false;
  export let loading;

  let scSwitch;

  export function focus() {
    if (scSwitch) {
      scSwitch.focus();
    }
  }

  export function blur() {
    if (scSwitch) {
      scSwitch.blur();
    }
  }

  $: classes = classnames(className, {
    [`${prefixCls}-small`]: size === 'small',
    [`${prefixCls}-loading`]: loading,
  });

  const defaultProps = {
    prefixCls,
    defaultChecked,
    disabled,
  }
</script>

<ScSwitch
  class={classes}
  {...defaultProps}
  {...$$props}
  bind:this={scSwitch}
>
  <span slot="loadingIcon">
    {#if loading}
      <Icon type="loading" class={`${prefixCls}-loading-icon`} />
    {/if}
  </span>
  <span slot="checkedChildren">
    <slot name="checkedChildren" />
  </span>
  <span slot="unCheckedChildren" >
    <slot name="unCheckedChildren" />
  </span>
</ScSwitch>



