<script context="module">
  import IconFont, { createFromIconfontScriptCN } from "./iconFont.svelte";
  const _primaryColor = "#1890ff";
  export function setTwoToneColor(primaryColor) {
    _primaryColor = primaryColor;
  }

  export function getTwoToneColor() {
    return _primaryColor;
  }
  export function createFromIconfontCN(options) {
    createFromIconfontScriptCN(options);
    return IconFont;
  }
</script>

<script>
  import classnames from 'classnames';
  import { generate as generateColor } from "@ant-design/colors";
  import { renderIconDefinitionToSVGElement } from "@ant-design/icons-svg/es/helpers";
  import * as allIcons from "@ant-design/icons-svg/es";
  import {
    svgBaseProps,
    withThemeSuffix,
    removeTypeTheme,
    getThemeFromTypeName,
    alias
  } from "./utils";
  import warning from '../_util/warning';
  import { formatStyle } from '../_util/styleToString';

  export let type;
  let className = undefined;
  export { className as class };
  export let theme= undefined;
  export let twoToneColor = undefined;
  export let viewBox = undefined;
  export let spin = undefined;
  export let rotate = undefined;
  export let prefixCls = undefined;
  export let style = {};

  let defaultTheme = "outlined";
  let iconSvg;
  let classString;
  let extraSVGAttrs = {};
  $: {
    classString = classnames(
      {
        [`anticon`]: true,
        [`anticon-${type}`]: Boolean(type)
      },
      className
    );
    extraSVGAttrs = {
      ...svgBaseProps,
      class: classnames({
        [`anticon-spin`]: !!spin || type === "loading"
      }),
      style: formatStyle({
        transform: rotate ? `rotate(${rotate}deg)` : null
      })
    };
    if (typeof type === "string") {
      let computedType = type;
      if (theme) {
        const themeInName = getThemeFromTypeName(type);
        warning(
          !themeInName || theme === themeInName,
          "Icon",
          `The icon name '${type}' already specify a theme '${themeInName}',` +
            ` the 'theme' prop '${theme}' will be ignored.`
        );
      }
      computedType = withThemeSuffix(
        removeTypeTheme(alias(computedType)),
        theme || defaultTheme
      );

      const primaryColor = twoToneColor || getTwoToneColor();
      iconSvg = renderIconDefinitionToSVGElement(allIcons[computedType], {
        extraSVGAttrs,
        placeholders: {
          primaryColor,
          secondaryColor: generateColor(primaryColor)[0]
        }
      });
    }
  }

  let hasSlot = !!$$props.$$slots;
  let isDefault = hasSlot && $$props.$$slots.default;
  let isOnlyPath = hasSlot && $$props.$$slots["only-path"];
  let isSvgComponent = hasSlot && $$props.$$slots["component"];
</script>

<i
  class={classString}
  aria-label={type}
  style={formatStyle(style)}
  on:click
  on:mouseout>
  {#if isSvgComponent}
    <slot name="component" />
  {:else if iconSvg}
    {@html iconSvg}
  {:else if isOnlyPath}
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <slot name="only-path" />
    </svg>
  {:else if isDefault}
    <slot />
  {/if}
</i>