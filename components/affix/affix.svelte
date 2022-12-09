<script>
  import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
  import classnames from 'classnames';
  import getScroll from '../_util/getScroll'

  const dispatch = createEventDispatcher();

  const getTargetRect = (target) => {
    return target !== window ? target.getBoundingClientRect() :
      { top: 0, left: 0, bottom: 0 };
  }

  const getOffset = (element, target) => {
    const elemRect = element.getBoundingClientRect();
    const targetRect = getTargetRect(target);

    const scrollTop = getScroll(target, true);
    const scrollLeft = getScroll(target, false);

    const docElem = window.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
      top: elemRect.top - targetRect.top +
        scrollTop - clientTop,
      left: elemRect.left - targetRect.left +
        scrollLeft - clientLeft,
      width: elemRect.width,
      height: elemRect.height,
    };
  }

  const getDefaultTarget = () => {
    return typeof window !== 'undefined' ? window : null;
  }

  export let offsetTop = undefined;
  export let offset = undefined;
  export let offsetBottom = undefined;
  export let target = undefined;
  export let prefixCls = 'ant-fix';

  let timeout;

  const events = [
    'resize',
    'scroll',
    'touchstart',
    'touchmove',
    'touchend',
    'pageshow',
    'load',
  ];
  const eventHandlers = {};
  let affixStyle = undefined;
  let placeholderStyle = undefined;
  let fixedNodeRef;
  let placeholderNodeRef;

  const currentTarget = target || getDefaultTarget;
  timeout = setTimeout(() => {
    setTargetEventListeners(currentTarget);
  });

  afterUpdate(() => {
    updatePosition({});
  });

  onDestroy(() => {
    clearEventListeners();
    clearTimeout(timeout);
    updatePosition.cancel();
  });

  const setAffixStyle = (e, affixStyleData) => {
    const currentTarget = target || getDefaultTarget;
    const originalAffixStyle = affixStyle;
    const isWindow = currentTarget() === window;
    if (e.type === 'scroll' && originalAffixStyle && affixStyleData && isWindow) {
      return;
    }
    affixStyle = affixStyleData;
    const affixed = !!affixStyle;
    if ((affixStyleData && !originalAffixStyle) || (!affixStyleData && originalAffixStyle)) {
      dispatch('change', affixed);
    }
  }

  const setPlaceholderStyle = (placeholderStyleData) => {
    placeholderStyle = placeholderStyleData;
  }

  const syncPlaceholderStyle = (e) => {
    if (!affixStyle) {
      return;
    }
    const originalPlaceholderNode = placeholderNodeRef;
    originalPlaceholderNode.style.cssText = '';
    placeholderNodeRef = originalPlaceholderNode;
    setAffixStyle(e, {
      ...affixStyle,
      width: placeholderNodeRef.offsetWidth,
    });
    setPlaceholderStyle({
      width: placeholderNodeRef.offsetWidth,
    })
  }

  const updatePosition = (e) => {
    const currentTarget = target || getDefaultTarget;
    const targetNode = currentTarget();
    offsetTop = typeof offsetTop === 'undefined' ? offset : offsetTop;

    const scrollTop = getScroll(targetNode, true);
    const affixNode = placeholderNodeRef; // TODO: 待确认
    const elemOffset = getOffset(affixNode, targetNode);
    const elemSize = {
      width: fixedNodeRef.offsetWidth,
      height: fixedNodeRef.offsetHeight,
    };
    const offsetMode = {
      top: false,
      bottom: false,
    };
    // Default to `offsetTop=0`.
    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }

    const targetRect = getTargetRect(targetNode);
    const targetInnerHeight =
      targetNode.innerHeight || targetNode.clientHeight;

    if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
      // Fixed Top
      const width = elemOffset.width;
      const top = targetRect.top + offsetTop;
      setAffixStyle(e, {
        position: 'fixed',
        top,
        left: targetRect.left + elemOffset.left,
        width,
      });
      setPlaceholderStyle({
        width,
        height: elemSize.height,
      });
    } else if (
      scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight &&
        offsetMode.bottom
    ) {
      // Fixed Bottom
      const targetBottomOffet = targetNode === window ? 0 : (window.innerHeight - targetRect.bottom);
      const width = elemOffset.width;
      setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffet + offsetBottom,
        left: targetRect.left + elemOffset.left,
        width,
      });
      setPlaceholderStyle({
        width,
        height: elemOffset.height,
      });
    } else {
      if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
        setAffixStyle(e, { ...affixStyle, width: affixNode.offsetWidth });
      } else {
        setAffixStyle(e, null);
      }
      setPlaceholderStyle(null);
    }

    if (e.type === 'resize') {
      syncPlaceholderStyle(e);
    }
  }

  const setTargetEventListeners = (getTarget) => {
    const currentTarget = getTarget();
    if (!currentTarget) {
      return;
    }
    clearEventListeners();

    events.forEach(eventName => {
      eventHandlers[eventName] = addEventListener(currentTarget, eventName, updatePosition);
    })
  };

  const clearEventListeners = () => {
    events.forEach(eventName => {
      const handler = eventHandlers[eventName];
      if (handler && handler.remove) {
        handler.remove();
      }
    })
  }

  $: className = classnames({
    [prefixCls]: !!affixStyle
  });
</script>

<div
  style={placeholderStyle}
  bind:this={placeholderNodeRef}
  {...$$restProps}
>
  <div class={className} bind:this={fixedNodeRef} style={affixStyle}>
    <slot />
  </div>
</div>