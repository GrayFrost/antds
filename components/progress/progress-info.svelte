<script>
  import Icon from '../icon';

  export let prefixCls;
  export let showInfo;
  export let title;
  export let progressStatus;
  export let percent;
  export let isLineType;
</script>

{#if !showInfo}
  {''}
{:else}
  <span
    class={`${prefixCls}-text`}
    title={title}
  >
    {#if progressStatus !== 'exception' && progressStatus !== 'success'}
      {`${percent}%`}
    {:else if progressStatus === 'exception'}
      {#if isLineType}
        <Icon type="close-circle" theme="filled" />
      {:else}
        <Icon type="close" />
      {/if}
    {:else if progressStatus === 'success'}
      {#if isLineType}
        <Icon type="check-circle" theme="filled" />
      {:else}
        <Icon type="check" />
      {/if}
    {/if}
  </span>
{/if}