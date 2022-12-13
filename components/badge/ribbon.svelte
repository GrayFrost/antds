<script>
  import classnames from 'classnames';
  import { isPresetColor } from './utils';
  import { formatStyle } from '../_util/styleToString';

  export let prefixCls = 'ant-ribbon';
  export let color;
  export let text;
  export let placement = 'end';
  let className;
  export { className as class };
  export let style = {};

  $: colorInPreset = isPresetColor(color);
  $: ribbonCls = classnames(prefixCls, `${prefixCls}-${placement}`, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-color-${color}`]: colorInPreset,
  }, className);

  const colorStyle = {};
  const cornerColorStyle = {};
  $: {
    if (color && !colorInPreset) {
      colorStyle.background = color;
      cornerColorStyle.color = color;
    }
  }
</script>

<div class={`${prefixCls}-wrapper`}>
  <slot />
  <div class={ribbonCls} style={formatStyle({
    ...colorStyle,
    ...style,
  })}>
    <span class={`${prefixCls}-text`}>
      {#if $$slots.text}
        <slot name="text" />
      {:else}
        {text}
      {/if}
    </span>
    <div class={`${prefixCls}-corner`} style={formatStyle(cornerColorStyle)} />
  </div>
</div>