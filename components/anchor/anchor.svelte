<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import { writable } from 'svelte/store';
  import classnames from 'classnames';
  import Affix from '../affix';
  import scrollTo from '../_util/scrollTo';
  import getScroll from '../_util/getScroll';
  import { formatStyle } from '../_util/styleToString';
  import addEventListener from '../sc-util/Dom/addEventListener';
  import { useProvideAnchor } from './context';

  const dispatch = createEventDispatcher();

  function getDefaultContainer() {
    return window;
  }

  function getOffsetTop(element, container) {
    if (!element.getClientRects().length) {
      return 0;
    }

    const rect = element.getBoundingClientRect();

    if (rect.width || rect.height) {
      if (container === window) {
        container = element.ownerDocument && element.ownerDocument.documentElement ? element.ownerDocument.documentElement : null;
        return rect.top - container.clientTop;
      }
      return rect.top - container.getBoundingClientRect().top;
    }

    return rect.top;
  }
  const sharpMatcherRegx = /#([\S ]+)$/;

  export let prefixCls = 'ant-anchor';
  export let offsetTop;
  export let bounds;
  export let affix = true;
  export let showInkInFixed = false;
  export let getContainer;
  export let getCurrentAnchor;

  export let wrapperClass = '';
  export let wrapperStyle = {};
  export let targetOffset;
  export let direction;

  let links = [];
  let scrollContainer = null;
  let scrollEvent = null;
  let animating = false;
  let activeLink = null;

  $: _getContainer = getContainer || getDefaultContainer; // TODO: getTargetContainer?

  const _getCurrentAnchor = (offsetTop = 0, bounds = 5) => {
    const linkSections = [];
    const container = _getContainer();
    links.forEach(link => {
      const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, container);
        if (top < offsetTop + bounds) {
          linkSections.push({
            link,
            top,
          });
        }
      }
    });

    if (linkSections.length) {
      const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
      return maxSection.link;
    }
    return '';
  };

  const setCurrentActiveLink = (link) => {
    if (activeLink === link) {
      return;
    }
    activeLink = typeof getCurrentAnchor === 'function' ? getCurrentAnchor() : link;
    dispatch('change', link);
  };

  export const handleScrollTo = (link) => {
    setCurrentActiveLink(link);
    const container = _getContainer();
    const scrollTop = getScroll(container, true);
    const sharpLinkMatch = sharpMatcherRegx.exec(link);
    if (!sharpLinkMatch) {
      return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
      return;
    }

    const eleOffsetTop = getOffsetTop(targetElement, container);
    let y = scrollTop + eleOffsetTop;
    y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
    animating = true;

    scrollTo(y, {
      callback: () => {
        animating = false;
      },
      getContainer: _getContainer,
    });
  };

  const handleScroll = () => {
    if (animating) {
      return;
    }
    const currentActiveLink = _getCurrentAnchor(
      targetOffset !== undefined ? targetOffset : offsetTop || 0,
      bounds,
    );
    setCurrentActiveLink(currentActiveLink);
  };

  let anchorRef;
  let inkNodeRef;

  const updateInk = () => {
    const linkNode = anchorRef.getElementsByClassName(
      `${prefixCls}-link-title-active`,
    )[0];
    if (linkNode) {
      inkNodeRef.style.top = `${
        linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5
      }px`;
    }
  };

  onMount(() => {
    const container = _getContainer();
    scrollContainer = container;
    scrollEvent = addEventListener(scrollContainer, 'scroll', handleScroll);
    handleScroll();
  })

  onDestroy(() => {
    if (scrollEvent) {
      scrollEvent.remove();
    }
  });

  afterUpdate(() => {
    if (scrollEvent) {
      const currentContainer = _getContainer();
      if (scrollContainer !== currentContainer) {
        scrollContainer = currentContainer;
        scrollEvent.remove();
        scrollEvent = addEventListener(scrollContainer, 'scroll', handleScroll);
        handleScroll();
      }
    }
    updateInk();
  });

  useProvideAnchor({
    registerLink: (link) => {
      if (!links.includes(link)) {
        links.push(link);
      }
    },
    unregisterLink: (link) => {
      const index = links.indexOf(link);
      if (index !== -1) {
        const newLinks = [...links];
        newLinks.splice(index, 1);
        links = newLinks;
      }
    },
    activeLink: writable(activeLink),
    scrollTo: handleScrollTo,
    handleClick: (e, info) => {
      dispatch('click', info);
    }
  })

  $: inkClass = classnames(`${prefixCls}-ink-ball`, {
    visible: activeLink,
  });

  $: wrapperClass = classnames(wrapperClass, `${prefixCls}-wrapper`, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  $: anchorClass = classnames(prefixCls, {
    [`${prefixCls}-fixed`]: !affix && !showInkInFixed,
  });

  $: wrapperStyle = {
    maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
    ...wrapperStyle,
  };
</script>

{#if !affix}
  <div class={wrapperClass} style={formatStyle(wrapperStyle)} bind:this={anchorRef}>
    <div class={anchorClass}>
      <div class={`${prefixCls}-ink`}>
        <span class={inkClass} bind:this={inkNodeRef} />
      </div>
      <slot />
    </div>
  </div>
{:else}
  <Affix offsetTop={offsetTop} target={_getContainer}>
    <div class={wrapperClass} style={formatStyle(wrapperStyle)} bind:this={anchorRef}>
      <div class={anchorClass}>
        <div class={`${prefixCls}-ink`}>
          <span class={inkClass} bind:this={inkNodeRef} />
        </div>
        <slot />
      </div>
    </div>
  </Affix>
{/if}