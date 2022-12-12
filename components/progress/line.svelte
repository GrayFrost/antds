<script context="module">
  import { presetPrimaryColors } from '@ant-design/colors';

  /**
   * {
   *   '0%': '#afc163',
   *   '75%': '#009900',
   *   '50%': 'green',     ====>     '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
   *   '25%': '#66FF00',
   *   '100%': '#ffffff'
   * }
   */
  export const sortGradient = (gradients) => {
    let tempArr = [];
    Object.keys(gradients).forEach(key => {
      const formattedKey = parseFloat(key.replace(/%/g, ''));
      if (!isNaN(formattedKey)) {
        tempArr.push({
          key: formattedKey,
          value: gradients[key],
        });
      }
    });
    tempArr = tempArr.sort((a, b) => a.key - b.key);
    return tempArr.map(({ key, value }) => `${value} ${key}%`).join(', ');
  };

  /**
   * Then this man came to realize the truth: Besides six pence, there is the moon. Besides bread and
   * butter, there is the bug. And... Besides women, there is the code.
   *
   * @example
   *   {
   *     "0%": "#afc163",
   *     "25%": "#66FF00",
   *     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
   *     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
   *     "100%": "#ffffff"
   *   }
   */

   export const handleGradient = (strokeColor, directionConfig) => {
    const {
      from = presetPrimaryColors.blue,
      to = presetPrimaryColors.blue,
      direction = directionConfig === 'rtl' ? 'to left' : 'to right',
      ...rest
    } = strokeColor;
    if (Object.keys(rest).length !== 0) {
      const sortedGradients = sortGradient(rest);
      return { backgroundImage: `linear-gradient(${direction}, ${sortedGradients})` };
    }
    return { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` };
  };
  
</script>
<script>
  import { formatStyle } from '../_util/styleToString';
  import { getSuccessPercent, validProgress } from './utils';

  export let strokeColor;
  export let direction;
  export let percent = 0;
  export let strokeWidth;
  export let strokeLinecap;
  export let size;
  export let prefixCls;
  export let trailColor;
  export let success;

  $: backgroundProps = (() => {
    return strokeColor && typeof strokeColor !== 'string'
      ? handleGradient(strokeColor, direction)
      : {
          background: strokeColor,
        };
  })();

  $: trailStyle = trailColor ? {backgroundColor: trailColor} : undefined;

  $: percentStyle = (() => {
    return {
      width: `${validProgress(percent)}%`,
        height: `${strokeWidth || (size === 'small' ? 6 : 8)}px`,
        borderRadius: strokeLinecap === 'square' ? 0 : '',
        ...backgroundProps,
    }
  })();

  $: successPercent = getSuccessPercent($$props);
  $: successPercentStyle = (() => {
    return {
      width: `${validProgress(successPercent)}%`,
      height: `${strokeWidth || (size === 'small' ? 6 : 8)}px`,
      borderRadius: strokeLinecap === 'square' ? 0 : '',
      backgroundColor: success ? success.strokeColor : undefined,
    }
  })()
</script>

<div class={`${prefixCls}-outer`}>
  <div class={`${prefixCls}-inner`} style={formatStyle(trailStyle)}>
    <div class={`${prefixCls}-bg`} style={formatStyle(percentStyle)} />
    {#if successPercent !== undefined}
      <div class={`${prefixCls}-success-bg`} style={formatStyle(successPercentStyle)} />
    {/if}
  </div>
</div>
<slot />