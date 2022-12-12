<script>
  import classnames from 'classnames';

  export let title;
  export let description;
  export let stepNumber;
  
  export let icon = false;
  export let status;
  export let prefixCls;
  export let iconPrefix;

  $: icons = $$slots['icon-error'] || $$slots['icon-finish'];

  $: iconClassName = classnames({
    [`${prefixCls}-icon`]: true,
    [`${iconPrefix}icon`]: true,
    [`${iconPrefix}icon-${icon}`]: icon,
    [`${iconPrefix}icon-check`]: !icon && status === 'finish' && icons && !$$slots['icon-finish'],
    [`${iconPrefix}icon-close`]: !icon && status === 'error' && icons && !$$slots['icon-error'],
  });
  // TODO: progressDot ()
  // TODO: stepIcon()
</script>

{#if icon}
  <span class={`${prefixCls}-icon`}>
    <slot name="icon" />
  </span>
{:else if icons && !!$$slots['icon-finish'] && status === 'finish'}
  <span class={`${prefixCls}-icon`}>
    <slot name="icon-finish" />
  </span>
{:else if icons && !!$$slots['icon-error'] && status === 'error'}
  <span class={`${prefixCls}-icon`}>
    <slot name="icon-error" />
  </span>
{:else if icon || status === 'finish' || status === 'error'}
  <span class={iconClassName} />
{:else}
  <span class={`${prefixCls}-icon`}>
    {stepNumber}
  </span>
{/if}