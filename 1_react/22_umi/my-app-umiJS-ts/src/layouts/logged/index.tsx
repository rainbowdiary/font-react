/* 已登录 */
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Logged = () => {
  return (

    <Layout className={style.layout}>
      <Sider
        className={style.Sider}
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={onCollapse}
      >
        <MenuList theme={this.state.theme} mode={this.state.model} nav={nav} />
      </Sider>
      <Layout>
        <Header {...eventProps} />
        <Content className={style.content}>
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Logged 