<script>
  import Circle from './circle.svelte';
  import Steps from './steps.svelte';
  import Line from './line.svelte';
  import classnames from 'classnames';
  import ProgressInfo from './progress-info.svelte';
  import { getSuccessPercent, validProgress } from './utils';

  export let title;
  export let type = 'line';
  export let percent = 0;
  export let showInfo = true;
  export let trailColor = null;
  export let size = 'default';
  export let strokeLinecap = 'round';
  export let strokeColor;
  export let direction;
  export let prefixCls = 'ant-progress';
  export let status;
  export let steps;

  const progressStatuses = ['normal', 'exception', 'active', 'success'];

  $: classString = {
    [prefixCls]: true,
    [`${prefixCls}-${(type === 'dashboard' && 'circle') || type}`]: true,
    [`${prefixCls}-show-info`]: showInfo,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  };

  $: percentNumber = (() => {
    const successPercent = getSuccessPercent($$props);
    return parseInt(
      successPercent !== undefined ? successPercent.toString() : percent.toString(),
      10,
    );
  })();

  $: progressStatus = (() => {
    if (progressStatuses.indexOf(status) < 0 && percentNumber >= 100) {
      return 'success';
    }
    return status || 'normal';
  })();

  $: classNames = classnames({
    ...classString,
    [`${prefixCls}-status-${progressStatus}`]: true,
  });

  $: isLineType = type === 'line';
  // TODO text format
</script>

<div class={classNames} title={title}>
  {#if type === 'line'}
    {#if steps}
      <Steps
        {...$$props}
        strokeColor={typeof strokeColor === 'string' ? strokeColor : undefined}
        prefixCls={prefixCls}
        steps={steps}
      >
        <ProgressInfo
          prefixCls={prefixCls}
          showInfo={showInfo}
          title={title}
          progressStatus={progressStatus}
          percent={percent}
          isLineType={isLineType}
        />
      </Steps>
    {:else}
      <Line {...$$props} prefixCls={prefixCls}>
        <ProgressInfo
          prefixCls={prefixCls}
          showInfo={showInfo}
          title={title}
          progressStatus={progressStatus}
          percent={percent}
          isLineType={isLineType}
        />
      </Line>
    {/if}
  {:else if type === 'circle' || type === 'dashboard'}
    <Circle {...$$props} prefixCls={prefixCls}>
      <ProgressInfo
        prefixCls={prefixCls}
        showInfo={showInfo}
        title={title}
        progressStatus={progressStatus}
        percent={percent}
        isLineType={isLineType}
      />
    </Circle>
  {/if}
</div>