<script>
  import { Divider, Button, Row, Col, Icon, Alert, Checkbox, Switch } from "antds";
  import classnames from 'classnames';

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

<section>
  <h3>button</h3>
  <div>
    <Button.Group>
      <Button><span>中文</span></Button>
      <Button>OK</Button>
    </Button.Group>
    <Button.Group>
      <Button disabled>L</Button>
      <Button disabled>M</Button>
      <Button disabled>R</Button>
    </Button.Group>
    <Button.Group>
      <Button>L</Button>
      <Button>M</Button>
      <Button>R</Button>
    </Button.Group>

    <Button type="primary" block>
      Primary
    </Button>
  </div>
</section>
<section>
  <h3>divider</h3>
  <p>测试</p>
  <Divider />
  <p>测试2</p>
  <Divider dashed />
  <span>123</span><Divider type="vertical" /><span>456</span>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider>Text</Divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider orientation="left">Left Text</Divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider orientation="right">Right Text</Divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
</section>

<section>
  <h3>grid</h3>
  <Row gutter={[16, 16]}>
    <Col span={4}><div class="column">column</div></Col>
    <Col span={4}><div class="column">column</div></Col>
    <Col span={4}><div class="column">column</div></Col>
    <Col span={4}><div class="column">column</div></Col>
    <Col span={4}><div class="column">column</div></Col>
    <Col span={4}><div class="column">column</div></Col>
  </Row>
</section>

<section>
  <h3>icon</h3>
  <Icon type="home" style={{fontSize: '32px'}}/>
  <Icon type="setting" theme="filled" />
  <Icon type="smile" theme="outlined" />
  <Icon type="sync" spin />
  <Icon type="smile" rotate={180} />
  <Icon type="loading" />
  <Icon type="smile" theme="twoTone" />
  <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
  <IconFont type="icon-tuichu" />
  <IconFont type="icon-facebook" style={{fontSize: '32px'}}/>

  <Icon style={{ color: 'hotpink' }}>
    <svg slot="component" width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  </Icon>
</section>

<section>
  <h3>affix</h3>
  
</section>

<section>
  <h3>alert</h3>
  <Alert message="Success Text" type="success" closable />
  <Alert message="Info Text" type="info" showIcon banner closable/>
  <Alert message="Warning Text" type="warning" showIcon closable/>
  <Alert message="Error Text" type="error" closable description="Error Description Error Description Error Description" showIcon closeText="close now"/>
  <Alert message="Description Slot" type="success" showIcon closable>
      <p slot="description">
        Success Description
        <span style="color: red">Success</span>
        Description Success Description
      </p>
  </Alert>
</section>
<section>
  <h3>checkbox</h3>
  <div>
    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
      <Checkbox
        indeterminate={indeterminate}
        on:change={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
    </div>
    <br />
    <Checkbox.Group
      options={plainOptions}
      value={checkedList}
      on:change={onChange}
    />
  </div>
</section>

<section>
  <h3>checkbox</h3>
  <Switch defaultChecked onChange={onSwitchChange} loading>
    <span slot="checkedChildren">开</span>
    <span slot="unCheckedChildren">关</span>
  </Switch>
</section>


<style>

  section {
    margin: 20px 20px;
  }
  .column {
    background: #00a0e9;
    height: 120px;
    line-height: 120px;
    font-size: 13px;
    color: white;
  }

  .test {
    height: 30px;
    background-color: orange;
    border: 1px solid red;
  }

  .ant-motion-leave {
    overflow: hidden;
    opacity: 1;
    transition: max-height 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86), opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      padding-top 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86), padding-bottom 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      margin-bottom 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }

  .ant-motion-leave-active {
    max-height: 0;
    margin-bottom: 0 !important;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0;
  }
</style>