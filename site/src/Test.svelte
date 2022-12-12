<script>
  import { Divider, Button, Row, Col, Icon, Alert, Checkbox, Switch, Steps, Progress, Tag } from "antds";
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
  
</script>

<section id="progress-demo">
  <h3>progress</h3>
  <Progress type="circle" percent="75" />
  <Progress type="circle" percent="70" status="exception" />
  <Progress type="circle" percent="100" />

  <Progress type="dashboard" percent="75" />
  <Progress percent="50" steps="3" />

  <Progress percent="30" />
  <Progress percent="50" status="active" />
  <Progress percent="70" status="exception" />
  <Progress percent="100" />
  <Progress percent="50" showInfo={false} />
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

<p style="height: 80px"></p>

<style>

  section {
    margin: 20px 20px;
  }
</style>