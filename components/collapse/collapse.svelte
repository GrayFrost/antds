<script>
  import { createEventDispatcher } from 'svelte';
  import classnames from 'classnames';
  import { formatStyle } from '../_util/styleToString';

  const dispatch = createEventDispatcher();

  function getActiveKeysArray(activeKey) {
    let currentActiveKey = activeKey;
    if (!Array.isArray(currentActiveKey)) {
      const activeKeyType = typeof currentActiveKey;
      currentActiveKey =
        activeKeyType === 'number' || activeKeyType === 'string' ? [currentActiveKey] : [];
    }
    return currentActiveKey.map(key => String(key));
  }

  export let prefixCls = 'ant-collapse';
  export let accordion = false;
  export let destroyInactivePanel = false;
  export let bordered = true;
  export let expandIconPosition = 'left';
  export let activeKey = undefined;
  export let defaultActiveKey = undefined;
  export let direction;
  export let style = {};
  export let ghost = false;
  let className;
  export { className as class }

  let stateActiveKey;
  $: if (activeKey || defaultActiveKey) {
    stateActiveKey = getActiveKeysArray(activeKey ? activeKey : defaultActiveKey);
  }

  const setActiveKey = (_activeKey) => {
    if (activeKey === undefined) {
      stateActiveKey = _activeKey;
    }
    const newKey = accordion ? _activeKey[0] : _activeKey;
    dispatch('updateActiveKey', newKey);
    dispatch('change', newKey);
  }

  const onClickItem = (key) => {
    let activeKey = stateActiveKey;
    if (accordion) {
      activeKey = activeKey[0] === key ? [] : [key];
    } else {
      activeKey = [...activeKey];
      const index = activeKey.indexOf(key);
      const isActive = index > -1;
      if (isActive) {
        // remove active state
        activeKey.splice(index, 1);
      } else {
        activeKey.push(key);
      }
    }
    setActiveKey(activeKey);
  }

  $: iconPosition = (() => {
    if (expandIconPosition !== undefined) {
      return expandIconPosition;
    }
    return direction === 'rtl' ? 'right' : 'left';
  })();

  $: collapseClassName = classnames({
    [prefixCls]: true,
    [`${prefixCls}-borderless`]: !bordered,
    [`${prefixCls}-icon-position-${iconPosition}`]: true,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-ghost`]: !!ghost,
  }, className);
</script>

<div
  {...$$restProps}
  role={accordion ? 'tablist' : null}
  class={collapseClassName}
  style={formatStyle(style)}
>
  <slot />
</div>