<script>
  import Mask from './mask.svelte';
  import MobilePopupInner from './mobile-popup-inner.svelte';
  import PopupInner from './popup-inner.svelte';

  export let visible;
  export let mobile;
  export let mask;
  export let zIndex;
  export let prefixCls;
  export let destroyPopupOnHide;
  export let forceRender;
  let innerVisible = false;
  let inMobile = false;
  let popupRef;
  export let align = {};
  export let point = {};

  $: {
    innerVisible = visible;
    if (visible && mobile) {
      inMobile = true;
    }
  }

  // TODO: popupref expose function
  export const forceAlign = () => {
    if (popupRef.forceAlign) {
      popupRef.forceAlign()
    }
  }

  export const getElement = () => {
    return popupRef;
  }
</script>

<div>
  <Mask
    visible={innerVisible}
    prefixCls={prefixCls}
    zIndex={zIndex}
    mask={mask}
  >
  </Mask>
  {#if inMobile}
    <MobilePopupInner
      zIndex={zIndex}
      prefixCls={prefixCls}
      mobile={mobile}
      visible={visible}
      bind:this={popupRef}>
      <slot />
    </MobilePopupInner>
  {:else}
    <PopupInner
      zIndex={zIndex}
      prefixCls={prefixCls}
      visible={visible}
      align={align}
      point={point}
      bind:this={popupRef}
    >
      <slot />
    </PopupInner>
  {/if}
</div>
