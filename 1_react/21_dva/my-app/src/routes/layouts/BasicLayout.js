import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import "./BasicLayout.less"
const { Header, Sider, Content } = Layout;

const BaiscLayout = () => {
  const [collapsed, setCollapsed] = useState('false')

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            {/* <Icon type="video-camera" /> */}
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            {/* <Icon type="upload" /> */}
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {/* <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          /> */}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          Content
            </Content>
      </Layout>
    </Layout>
  );
}
export default BaiscLayout
