<script>
  export let prefixCls = 'vc-progress';
  export let percent = 0;
  export let strokeLinecap = 'round';
  export let strokeWidth = 1;
  export let strokeColor = '#2db7f5';
  export let trailColor = '#D9D9D9';
  export let trailWidth = 1;
  export let transition;


  $: percentList = Array.isArray(percent) ? percent : [percent];
  let stackPtg = 0;

  $: strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];

  $: percentListProps = percentList.map((ptg, index) => {
    let dashPercent = 1;
    switch (strokeLinecap) {
      case 'round':
        dashPercent = 1 - strokeWidth / 100;
        break;
      case 'square':
        dashPercent = 1 - strokeWidth / 2 / 100;
        break;
      default:
        dashPercent = 1;
        break;
    }

    const pathStyle = {
      strokeDasharray: `${ptg * dashPercent}px, 100px`,
      strokeDashoffset: `-${stackPtg}px`,
      transition:
        transition ||
        'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear',
    };
    const color =
      strokeColorList[index] || strokeColorList[strokeColorList.length - 1];

    const pathProps = {
      key: index,
      d: pathString,
      'stroke-linecap': strokeLinecap,
      stroke: color,
      'stroke-width': strokeWidth,
      'fill-opacity': '0',
      class: `${prefixCls}-line-path`,
      style: pathStyle,
    };

    return pathProps;
  });

  $: center = strokeWidth / 2;
  $: right = 100 - strokeWidth / 2;
  $: pathString = `M ${strokeLinecap === 'round' ? center : 0},${center}
    L ${strokeLinecap === 'round' ? right : 100},${center}`;
  
  $: viewBoxString = `0 0 100 ${strokeWidth}`;
  $: pathFirst = {
      d: pathString,
      'stroke-linecap': strokeLinecap,
      stroke: trailColor,
      'stroke-width': trailWidth || strokeWidth,
      'fill-opacity': '0',
      class: `${prefixCls}-line-trail`,
    }
</script>

<svg
  class={`${prefixCls}-line`}
  viewBox={viewBoxString}
  preserveAspectRatio="none"
>
  <path {...pathFirst} />
  {#each percentListProps as pathProps, index}
    <path {...pathProps} />
  {/each}
</svg>

