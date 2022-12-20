<script>
  import { tick, onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
  import { alignElement, alignPoint } from 'dom-align';
  import addEventListener from '../sc-util/Dom/addEventListener';
  import isVisible from '../sc-util/Dom/isVisible';
  import { isSamePoint, restoreFocus, monitorResize } from './util';
  import useBuffer from './hooks/useBuffer';
  import isEqual from 'lodash-es/isEqual';

  const dispatch = createEventDispatcher();

  export let align = {};
  export let target;
  export let monitorBufferTime = 0;
  export let monitorWindowResize;
  export let disabled;

  function getElement(func) {
    if (typeof func !== 'function') return null;
    return func();
}

  function getPoint(point) {
    if (typeof point !== 'object' || !point) return null;
    return point;
  }

  let cacheRef = {};
  let nodeRef;
  let forceAlign = () => {}
  let cancelForceAlign = () => {}

  $: {
    const [_forceAlign, _cancelForceAlign] = useBuffer(() => {
      let latestDisabled = disabled;
      let latestTarget = target;
      let latestAlign = align;
      // TODO: onAlign

      if (!latestDisabled && latestTarget && nodeRef) {
        const source = nodeRef;

        let result;
        const element = getElement(latestTarget);
        const point = getPoint(latestTarget);

        cacheRef.element = element;
        cacheRef.point = point;
        cacheRef.align = latestAlign;
        // IE lose focus after element realign
        // We should record activeElement and restore later
        const { activeElement } = document;
        // We only align when element is visible
        if (element && isVisible(element)) {
          result = alignElement(source, element, latestAlign);
        } else if (point) {
          result = alignPoint(source, point, latestAlign);
        }
        restoreFocus(activeElement, source);

        // if (latestOnAlign && result) {
        //   latestOnAlign(source, result);
        // }
        if (result) {
          dispatch('align', {
            source,
            result,
          });
        }

        return true;
      }

      return false;
    }, monitorBufferTime);
    forceAlign = _forceAlign;
    cancelForceAlign = _cancelForceAlign;
  }

  // ===================== Effect =====================
  // Listen for target updated
  const resizeMonitor = {
    cancel: () => {},
  };
  // Listen for source updated
  const sourceResizeMonitor = {
    cancel: () => {},
  };

  const _goAlign = () => {
    const element = getElement(target);
    const point = getPoint(target);

    if (nodeRef !== sourceResizeMonitor.element) {
      sourceResizeMonitor.cancel();
      sourceResizeMonitor.element = nodeRef;
      sourceResizeMonitor.cancel = monitorResize(nodeRef, forceAlign);
    }

    if (
      cacheRef.element !== element ||
      !isSamePoint(cacheRef.point, point) ||
      !isEqual(cacheRef.align, align)
    ) {
      forceAlign();

      // Add resize observer
      if (resizeMonitor.element !== element) {
        resizeMonitor.cancel();
        resizeMonitor.element = element;
        resizeMonitor.cancel = monitorResize(element, forceAlign);
      }
    }
  };

  const goAlign = async () => {
    await tick();
    _goAlign();
  }

  onMount(() => {
    goAlign();
  })

  afterUpdate(() => {
    goAlign();
  })

  $: {
    if (!disabled) {
      forceAlign();
    } else {
      cancelForceAlign();
    }
  }

  let winResizeRef = null;
  $: {
    if (monitorWindowResize) {
      if (!winResizeRef) {
        winResizeRef = addEventListener(window, 'resize', forceAlign);
      }
    } else if (winResizeRef) {
      winResizeRef.remove();
      winResizeRef = null;
    }
  }

  onDestroy(() => {
    resizeMonitor.cancel();
    sourceResizeMonitor.cancel();
    if (winResizeRef) {
      winResizeRef.remove();
    }
    cancelForceAlign();
  })


</script>

<slot />