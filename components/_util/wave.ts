import TransitionEvents from './css-animation';

export function wave(ele: HTMLElement) {

  let instance;
  let extraNode: HTMLDivElement;
  let clickWaveTimeoutId;
  let styleForPesudo: HTMLStyleElement | null;
  const insertExtraNode = ele.dataset.insert === 'true' || false;

  function isNotGrey(color) {
    const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
    if (match && match[1] && match[2] && match[3]) {
      return !(match[1] === match[2] && match[2] === match[3]);
    }
    return true;
  }

  function getAttributeName() {
    return insertExtraNode ? 'ant-click-animating' : 'ant-click-animating-without-extra-node';
  }

  function _onClick(node: HTMLElement, waveColor: string) {
    extraNode = document.createElement('div');
    extraNode.className = 'ant-click-animating-node';
    const attributeName = getAttributeName();
    node.removeAttribute(attributeName);
    node.setAttribute(attributeName, 'true');
    // Not white or transparnt or grey
    styleForPesudo = styleForPesudo || document.createElement('style');
    if (waveColor &&
        waveColor !== '#ffffff' &&
        waveColor !== 'rgb(255, 255, 255)' &&
        isNotGrey(waveColor) &&
        !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) &&  // any transparent rgba color
        waveColor !== 'transparent') {
      extraNode.style.borderColor = waveColor;
      styleForPesudo.innerHTML =
        `[ant-click-animating-without-extra-node]:after { border-color: ${waveColor}; }`;
      if (!document.body.contains(styleForPesudo)) {
        document.body.appendChild(styleForPesudo);
      }
    }
    if (insertExtraNode) {
      node.appendChild(extraNode);
    }
    TransitionEvents.addEndEventListener(node, onTransitionEnd);
  }

  function bindAnimationEvent(node: HTMLElement) {
    if (!node ||
        !node.getAttribute ||
        node.getAttribute('disabled') ||
        node.className.indexOf('disabled') >= 0) {
      return;
    }
    const onClick = (e: MouseEvent) => {
      // Fix radio button click twice
      if ((e.target as HTMLElement).tagName === 'INPUT') {
        return;
      }
      resetEffect(node);
      // Get wave color from target
      const waveColor =
        getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
        getComputedStyle(node).getPropertyValue('border-color') ||
        getComputedStyle(node).getPropertyValue('background-color');
      clickWaveTimeoutId = window.setTimeout(() => _onClick(node, waveColor), 0);
    };
    node.addEventListener('click', onClick, true);
    return {
      cancel: () => {
        node.removeEventListener('click', onClick, true);
      },
    };
  }

  function resetEffect(node: HTMLElement) {
    if (!node || node === extraNode) {
      return;
    }
    const attributeName = getAttributeName();
    node.removeAttribute(attributeName);
    removeExtraStyleNode();
    if (insertExtraNode && extraNode && node.contains(extraNode)) {
      node.removeChild(extraNode);
    }
    TransitionEvents.removeEndEventListener(node, onTransitionEnd);
  }

  function onTransitionEnd(e: AnimationEvent) {
    if (!e || e.animationName !== 'fadeEffect') {
      return;
    }
    resetEffect(e.target as HTMLElement);
  }

  function removeExtraStyleNode() {
    if (styleForPesudo) {
      styleForPesudo.innerHTML = '';
    }
  }

  bindAnimationEvent(ele);

  return {
    destroy() {
      if (instance) {
        instance.cancel();
      }
      if (clickWaveTimeoutId) {
        clearTimeout(clickWaveTimeoutId);
      }
    }
  }
}
  

  
