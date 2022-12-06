<script>
  // TODO: form context
  import classnames from 'classnames';
  import { useConsumeRow } from './context';
  import { styleToString } from '../_util/styleToString';

  const parseFlex = (flex) => {
    if (typeof flex === 'number') {
      return `${flex} ${flex} auto`;
    }

    if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
      return `0 0 ${flex}`;
    }

    return flex;
  }

  export let span;
  export let order = undefined;
  export let offset = undefined;
  export let push = undefined;
  export let pull = undefined;
  export let xs = undefined;
  export let sm = undefined;
  export let md = undefined;
  export let lg = undefined;
  export let xl = undefined;
  export let xxl = undefined;
  export let xxxl = undefined;
  export let direction = undefined;
  export let flex = undefined;
  export let prefixCls = 'ant-col';

  const { gutter, supportFlexGap, wrap } = useConsumeRow();
  
  const computedClasses = () => {
    let sizeClassObj = {};
    const props = {
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      xxxl,
    };
    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'].forEach(size => {
      let sizeProps = {};
      const propSize = props[size];
      if (typeof propSize === 'number') {
        sizeProps.span = propSize;
      } else if (typeof propSize === 'object') {
        sizeProps = propSize || {};
      }

      sizeClassObj = {
        ...sizeClassObj,
        [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
        [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
        [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      };
    });

    return classnames(prefixCls, {
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull,
    }, sizeClassObj);
  }

  $: classes = computedClasses();

  const computedMergeStyle = () => {
    const style = {};
    // Horizontal gutter use padding
    if (gutter && gutter[0] > 0) {
      const horizontalGutter = `${gutter[0] / 2}px`;
      style['padding-left'] = horizontalGutter;
      style['padding-right'] = horizontalGutter;
    }

    // Vertical gutter use padding when gap not support
    if (gutter && gutter[1] > 0 && !supportFlexGap) {
      const verticalGutter = `${gutter[1] / 2}px`;
      style['padding-top'] = verticalGutter;
      style['padding-bottom'] = verticalGutter;
    }

    if (flex) {
      style.flex = parseFlex(flex);

      // Hack for Firefox to avoid size issue
      // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
      if (wrap === false && !style.minWidth) {
        style.minWidth = 0;
      }
    }
    return style;
  }

  $: mergedStyle = computedMergeStyle();

  $: styleString = styleToString(mergedStyle);
</script>

<div class={classes} style={styleString}>
  <slot />
</div>