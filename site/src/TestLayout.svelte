<script>
  import { Layout } from 'antds';
  const { Header, Sider, Content, Footer } = Layout;
</script>

<section>
<Layout>
  <Layout.Header>Header</Layout.Header>
  <Layout.Content>Content</Layout.Content>
  <Layout.Footer>Footer</Layout.Footer>
</Layout>
</section>

<section>
<Layout>
  <Header>Header</Header>
  <Layout>
    <Sider>Sider</Sider>
    <Content>Content</Content>
  </Layout>
  <Footer>Footer</Footer>
</Layout>
</section>

<section>
<Layout>
  <Header>Header</Header>
  <Layout>
    <Content>Content</Content>
    <Sider>Sider</Sider>
  </Layout>
  <Footer>Footer</Footer>
</Layout>
</section>

<section>
<Layout>
  <Sider>Sider</Sider>
  <Layout>
    <Header>Header</Header>
    <Content>Content</Content>
    <Footer>Footer</Footer>
  </Layout>
</Layout>
</section>

<style>
  section {
    margin: 20px 0;
  }
  
</style>