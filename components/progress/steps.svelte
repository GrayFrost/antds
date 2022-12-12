<script>
  import classnames from 'classnames';
  import { formatStyle } from '../_util/styleToString';

  export let prefixCls;
  export let steps;
  export let percent = 0;
  export let size;
  export let strokeWidth = 8;
  export let strokeColor;
  export let trailColor;

  $: current = Math.round(steps * percent / 100);
  $: stepWidth = size === 'small' ? 2 : 14;
  $: styleSteps = (() => {
    const temp = [];
    for (let i = 0; i < steps; i += 1) {
      const cls = classnames({
        [`${prefixCls}-steps-item`]: true,
        [`${prefixCls}-steps-item-active`]: i <= current - 1,
      });
      const style = {
        backgroundColor: i <= current - 1 ? strokeColor : trailColor,
        width: `${stepWidth}px`,
        height: `${strokeWidth}px`,
      }
      temp.push({
        cls,
        style
      });
    }
    return temp;
  })()
</script>

<div class={`${prefixCls}-steps-outer`}>
  {#each styleSteps as styleStep, index}
    <div key={index} class={styleStep.cls} style={formatStyle(styleStep.style)} />
  {/each}
  <slot />
</div>

