<script>
  import Icon from '../icon';
  export let collapsed = false;
  export let reverseArrow = false;
  $: status = collapsed ? 'collapsed' : 'expanded';
</script>

{#if status === 'collapsed'}
  {#if reverseArrow}
    <Icon type="left" />
  {:else}
    <Icon type="right" />
  {/if}
{:else}
  {#if reverseArrow}
    <Icon type="right" />
  {:else}
    <Icon type="left" />
  {/if}
{/if}