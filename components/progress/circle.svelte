<script>
  import classnames from 'classnames';
  import { presetPrimaryColors } from '@ant-design/colors';
  import { formatStyle } from '../_util/styleToString';
  import { Circle as SCCircle } from '../sc-progress';
  import { getSuccessPercent, validProgress } from './utils';

  export let prefixCls;
  export let gapDegree;
  export let type;
  export let width;
  export let strokeWidth;
  export let strokeLinecap;
  export let trailColor;
  export let gapPosition;
  export let success;

  function getPercentage({ percent, success, successPercent }) {
    const realSuccessPercent = validProgress(getSuccessPercent({ success, successPercent }));
    return [realSuccessPercent, validProgress(validProgress(percent) - realSuccessPercent)];
  }

  function getStrokeColor({
    success = {},
    strokeColor,
  }) {
    const { strokeColor: successColor } = success;
    return [successColor || presetPrimaryColors.green, strokeColor || {}];
  }

  $: gapDeg = (() => {
    if (gapDegree || gapDegree === 0) {
      return gapDegree;
    }
    if (type === 'dashboard') {
      return 75;
    }
    return undefined;
  })();

  $: circleStyle = (() => {
    const circleSize = width || 120;
    return {
      width: typeof circleSize === 'number' ? `${circleSize}px` : circleSize,
      height: typeof circleSize === 'number' ? `${circleSize}px` : circleSize,
      fontSize: `${circleSize * 0.15 + 6}px`
    }
  })();

  $: circleWidth = strokeWidth || 6;
  $: gapPos = (() => {
    if (gapPosition) {
      return gapPosition;
    }
    if (type === 'dashboard') {
      return 'bottom';
    }
    return 'top';
  })();

  $: percent = getPercentage($$props);
  $: isGradient = Object.prototype.toString.call(strokeColor) === '[object Object]';
  $: strokeColor =  getStrokeColor({ success: success, strokeColor: strokeColor });
  $: wrapperClassName = classnames({
    [`${prefixCls}-inner`]: true,
    [`${prefixCls}-circle-gradient`]: isGradient,
  });
</script>

<div class={wrapperClassName} style={formatStyle(circleStyle)}>
  <SCCircle
    percent={percent}
    strokeWidth={circleWidth}
    trailWidth={circleWidth}
    strokeColor={strokeColor}
    strokeLinecap={strokeLinecap}
    trailColor={trailColor}
    prefixCls={prefixCls}
    gapDegree={gapDeg}
    gapPosition={gapPos}
  />
  <slot />
</div>