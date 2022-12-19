<script>
  import classnames from 'classnames';
  import { useConsumeAnchor } from './context';

  export let prefixCls = 'ant-anchor';
  export let href;
  export let target;
  export let title;

  let oldHref = href;

  const {
    handleClick: contextHandleClick,
    scrollTo,
    unregisterLink,
    registerLink,
    activeLink
  } = useConsumeAnchor();

  $: {
    if (oldHref !== href) {
      if (oldHref) {
        unregisterLink(oldHref)
      }
      registerLink(href);
    }
    oldHref = href;
  }


  $: active = $activeLink === href;
  $: wrapperClassName = classnames(`${prefixCls}-link`, {
    [`${prefixCls}-link-active`]: active,
  });
  $: titleClassName = classnames(`${prefixCls}-link-title`, {
    [`${prefixCls}-link-title-active`]: active,
  });

  const handleClick = (e) => {
    console.log('zzh handleclickc link', title, href);
    contextHandleClick(e, { title, href });
    scrollTo(href);
  }
</script>

<div class={wrapperClassName}>
  <a
    class={titleClassName}
    href={href}
    title={typeof title === 'string' ? title : ''}
    target={target}
    on:click={handleClick}
    {...$$restProps}
  >
    {title}
  </a>
  <slot />
</div>