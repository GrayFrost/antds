<script>
  import { Affix, Divider, Button, Row, Col, Icon, Alert, Checkbox, Switch, Steps, Progress, Tag, Anchor, BackTop } from "antds";
  import classnames from 'classnames';
  import TestComponents from './TestComponents.svelte';
  import TestComponent from './TestComponent.svelte';

  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

  let hide = false;
  let closed = false;
  const testHide = () => {
    hide = true;
  }
  

  $: testClass = classnames('test', 
    'ant-motion-leave',
  {
    'ant-motion-leave-active': hide,
  })

  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const defaultCheckedList = ['Apple', 'Orange'];

  let checkedList = [...defaultCheckedList];
  let indeterminate = true;
  let checkAll = false;
  let checked = false;

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues.detail);
    checkedList = checkedValues.detail;
    indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
    checkAll = checkedList.length === plainOptions.length;
  }

  function onCheckAllChange(e) {
    checkedList = e.detail.target.checked ? plainOptions : [];
    indeterminate = false;
    checkAll = e.detail.target.checked;
  }

  function onSwitchChange(check) {
    console.log('zzh switch change', check);
  }

  function tagLog(e) {
    console.log('zzh tag close', e);
  }

  let checked1 = false;
  let checked2 = false;
  function handleTagChange(e){
    console.log('zzh tag change', e.detail);
  }

  function onAnchorClick(e, link) {
    console.log('zzh anchor click', e, link);
  }
  
  let affixWrapRef;
</script>

<BackTop></BackTop>
<section>
  <h3>alert</h3>
  <Alert
    message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
    type="warning"
    closable
    on:close={() => console.log('zzh alert close')}
  />
  <Alert
    message="title"
    description="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
    type="warning"
    closable
    on:close={() => console.log('zzh alert close')}
  />
  <Alert
    message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
    type="error"
    closable
    on:close={() => console.log('zzh alert close')}
  />
  <Alert message="Error Text"
  description="Error Description Error Description Error Description Error Description Error Description Error Description" closable />
</section>

<section id="affix-demo">
  <Affix offsetTop={10}>
    <Button type="primary">button</Button>
  </Affix>
  <Affix offsetBottom={10}>
    <Button type="primary">button bottom</Button>
  </Affix>

  <div style="height: 100px;overflow-y: scroll;"  bind:this={affixWrapRef}>
    <div style="background: blue; height: 300px">
      <p style="height: 50px;">height</p>
      <Affix target={() => affixWrapRef}>
        <Button type="primary">target</Button>
      </Affix>
    </div>
  </div>
</section>

<section>
  <h3>tag</h3>
  <Tag>Tag 1</Tag>
  <Tag><a href="https://github.com/vueComponent/ant-design">Link</a></Tag>
  <Tag closable on:close={tagLog}>Tag 2</Tag>

  <Tag.CheckableTag checked={checked1} on:change={(e) => checked1 = e.detail}>tag 1</Tag.CheckableTag>
  <Tag.CheckableTag checked={checked2} on:change={(e) => checked2 = e.detail}>tag 2</Tag.CheckableTag>

  <Tag color="pink">pink
    <Icon type="check" slot="icon" />
  </Tag>
  <Tag color="red">red</Tag>
  <Tag color="orange">orange</Tag>
  <Tag color="green">green</Tag>
  <Tag color="cyan">cyan</Tag>
  <Tag color="blue">blue</Tag>
  <Tag color="purple">purple</Tag>
  <Tag color="#f50">#f50</Tag>
  <Tag color="#2db7f5">#2db7f5</Tag>
</section>

<section>
  <h3>anchor</h3>
  <Anchor affix={false} on:click={onAnchorClick}>
    <Anchor.Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Anchor.Link href="#components-anchor-demo-static" title="Static demo" />
    <Anchor.Link href="#components-anchor-demo-basic" title="Basic demo with Target" target="_blank" />
    <Anchor.Link href="#API" title="API">
      <Anchor.Link href="#Anchor-Props" title="Anchor Props" />
      <Anchor.Link href="#Link-Props" title="Link Props" />
    </Anchor.Link>
  </Anchor>
</section>

<div id="components-anchor-demo-basic" style="height: 500px;background: orange"></div>
<h2 id="API" >api</h2>
<div style="height: 800px;background: pink;">
  <div id="Anchor-Props" style="height: 400px;">hello world</div>
  <div id="Link-Props" style="border:1px solid red">你好</div>
</div>
<div style="height: 300px"></div>

<style>
  section {
    margin: 20px 20px;
  }
</style>