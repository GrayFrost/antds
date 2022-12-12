<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import classnames from 'classnames';
  import RenderIconNode from './render-icon-node.svelte';
  import { ScStepsContextKey } from './context';
  import Icon from '../icon';
  import { current as currentStore, status as statusStore } from './store';

  const dispatch = createEventDispatcher();

  export let itemWidth;
  export let disabled = false;
  export let adjustMarginRight;
  // export let stepIndex;
  export let description;
  export let title;
  export let subTitle;
  export let progressDot;
  export let tailContent;
  export let icons;
  let stepStatus;
  export {stepStatus as status};

  const { setIndex, prefixCls, status, current, iconPrefix } = getContext(ScStepsContextKey);
  const stepIndex = setIndex();
  const stepNumber = stepIndex + 1;
  const active = $current === stepIndex;
  const _status = stepStatus ? stepStatus : active ? $status : stepIndex < $current ? 'finish' : 'wait';// step的status 优先级更高
  const icon = !!$$slots.icon;

  function onItemClick(e) {
    dispatch('click', e);
    dispatch('stepClick', stepIndex);
  }

  $: classString = classnames({
    [`${$prefixCls}-item`]: true,
    [`${$prefixCls}-item-${_status}`]: true,
    [`${$prefixCls}-item-custom`]: icon,
    [`${$prefixCls}-item-active`]: active,
    [`${$prefixCls}-item-disabled`]: disabled === true,
  });
</script>

<div class={classString}>
  <div
    role="button"
    tabindex="0"
    on:click={onItemClick}
    class={`${$prefixCls}-item-container`}
  >
    <div class={`${$prefixCls}-item-tail`}>{tailContent || ''}</div>
    <div class={`${$prefixCls}-item-icon`}>
      <RenderIconNode
        icon={!!$$slots.icon}
        title={title}
        description={description}
        prefixCls={$prefixCls}
        iconPrefix={$iconPrefix}
        status={_status}
        stepNumber={stepNumber}
      >
        <Icon type="check" slot="icon-finish" />
        <Icon type="close" slot="icon-error" />
        
        <span slot="icon">
          <slot name="icon" />
        </span>
      </RenderIconNode>
    </div>
    <div class={`${$prefixCls}-item-content`}>
      <div class={`${$prefixCls}-item-title`}>
        {title}
        {#if subTitle}
          <div title={subTitle} class={`${$prefixCls}-item-subtitle`}>
            {subTitle}
          </div>
        {/if}
      </div>
      {#if description}
        <div class={`${$prefixCls}-item-description`}>{description}</div>
      {/if}
    </div>
  </div>
</div>



