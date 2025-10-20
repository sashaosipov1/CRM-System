import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items2 = [
    {
        key: '1',
        icon: <VideoCameraOutlined />,
        label: <Link to="/">Todos</Link>,
    },
    {
        key: '2',
        icon: <UserOutlined />,
        label: <Link to="/account">Account</Link>,
    }
];

const navigationMenu: React.FC<{ children: React.ReactNode }> = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items2} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content style={{ margin: '24px 16px 10px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: '100%',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default navigationMenu