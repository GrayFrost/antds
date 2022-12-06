<script>
  import { Divider, Button, Row, Col } from "antds";
</script>

<section>
  <Button>test</Button>
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

<style>
  .column {
    background: #00a0e9;
    height: 120px;
    line-height: 120px;
    font-size: 13px;
    color: white;
  }
</style>