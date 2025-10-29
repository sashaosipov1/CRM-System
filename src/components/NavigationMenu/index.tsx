import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items = [
    {
        key: '1',
        icon: <VideoCameraOutlined />,
        label: <Link to="/">Todos</Link>,
        path: '/',
    },
    {
        key: '2',
        icon: <UserOutlined />,
        label: <Link to="/profile">Profile</Link>,
        path: '/profile',
    }
];

const navigationMenu: React.FC<{ children: React.ReactNode }> = (props) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const currentItem = items.find(item => item.path === location.pathname);
    let currentItemKey = ``;
    if (currentItem) {
        currentItemKey = currentItem.key;
    }
    console.log(currentItemKey);

    const [selectedKey, setSelectedKey] = useState<string>(`${currentItemKey}`);
    console.log(selectedKey);
    

    useEffect(() => {
        const currentItem = items.find(item => item.path === location.pathname);
        if (currentItem) {
            setSelectedKey(currentItem.key);
        }

    }, [location.pathname]);

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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]} items={items} />
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