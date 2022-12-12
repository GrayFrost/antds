<script>
  import { Divider, Button, Row, Col, Icon, Alert, Checkbox, Switch, Steps, Progress } from "antds";
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

<p style="height: 80px"></p>

<style>

  section {
    margin: 20px 20px;
  }
</style>