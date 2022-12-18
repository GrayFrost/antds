<script>
  import { addGradientSeed, getGradientSeed } from './context';
  import { formatStyle } from '../../_util/styleToString';

  export let prefixCls = 'vc-progress';
  export let percent = 0;
  export let strokeLinecap = 'round';
  export let strokeWidth = 1;
  export let strokeColor = '#2db7f5';
  export let trailColor = '#D9D9D9';
  export let trailWidth = 1;
  export let gapDegree;
  export let gapPosition;

  function stripPercentToNumber(percent) {
    return +percent.replace('%', '');
  }

  function toArray(value) {
    return Array.isArray(value) ? value : [value];
  }

  function getPathStyles(
    offset,
    percent,
    strokeColor,
    strokeWidth,
    gapDegree = 0,
    gapPosition,
  ) {
    const radius = 50 - strokeWidth / 2;
    let beginPositionX = 0;
    let beginPositionY = -radius;
    let endPositionX = 0;
    let endPositionY = -2 * radius;
    switch (gapPosition) {
      case 'left':
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = 2 * radius;
        endPositionY = 0;
        break;
      case 'right':
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = -2 * radius;
        endPositionY = 0;
        break;
      case 'bottom':
        beginPositionY = radius;
        endPositionY = 2 * radius;
        break;
      default:
    }
    const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
    a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
    a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
    const len = Math.PI * 2 * radius;

    const pathStyle = {
      stroke: strokeColor,
      strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2 + (offset / 100) * (len - gapDegree)}px`,
      transition:
        'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s', // eslint-disable-line
    };

    return {
      pathString,
      pathStyle,
    };
  }

  
  const oldGradientId = getGradientSeed();
  addGradientSeed();
  const gradientId = oldGradientId + 1;
  $: percentList = toArray(percent);
  $: strokeColorList = toArray(strokeColor);

  function getStrokeList(percentList) {
    let stackPtg = 0;
    return percentList.map((ptg, index) => {
      const color =
        strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
      const stroke =
        Object.prototype.toString.call(color) === '[object Object]'
          ? `url(#${prefixCls}-gradient-${gradientId})`
          : '';
      const { pathString, pathStyle } = getPathStyles(
        stackPtg,
        ptg,
        color,
        strokeWidth,
        gapDegree,
        gapPosition,
      );

      stackPtg += ptg;

      const pathProps = {
        key: index,
        d: pathString,
        stroke,
        'stroke-linecap': strokeLinecap,
        'stroke-width': strokeWidth,
        opacity: ptg === 0 ? 0 : 1,
        'fill-opacity': '0',
        class: `${prefixCls}-circle-path`,
        style: formatStyle(pathStyle),
      };
      return pathProps;
    });
  }

  
  $: reverseStrokeList = getStrokeList(percentList).reverse();

  const { pathString, pathStyle } = getPathStyles(
    0,
    100,
    trailColor,
    strokeWidth,
    gapDegree,
    gapPosition,
  );

  $: gradient = strokeColorList.find(
    color => Object.prototype.toString.call(color) === '[object Object]',
  );

  $: sortGradient = Object.keys(gradient).sort((a, b) => stripPercentToNumber(a) - stripPercentToNumber(b));

  $: pathFirst = {
    d: pathString,
    stroke: trailColor,
    'stroke-linecap': strokeLinecap,
    'stroke-width': trailWidth || strokeWidth,
    'fill-opacity': '0',
    class: `${prefixCls}-circle-trail`,
    style: formatStyle(pathStyle),
  };

  
</script>

<svg
  class={`${prefixCls}-circle`} viewBox="0 0 100 100"
>
  {#if gradient}
    <defs>
      <linearGradient
        id={`${prefixCls}-gradient-${gradientId}`}
        x1="100%"
        y1="0%"
        x2="0%"
        y2="0%"
      >
      {#each sortGradient as key, index}
        <stop key={index} offset={key} stop-color={gradient[key]} />
      {/each}
    </defs>
  {/if}
  <path {...pathFirst} />
  {#each reverseStrokeList as pathProps, index}
    <path {...pathProps} />
  {/each}
</svg>