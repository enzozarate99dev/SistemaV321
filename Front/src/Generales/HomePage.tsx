import 'antd/dist/reset.css';
import { Layout, Card, Menu, Breadcrumb } from 'antd';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';    
import { useState } from 'react';



export default function HomePage() {
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [visible, setVisible] = useState(false);

    const { Header, Footer, Sider, Content } = Layout;

    return (
        <Layout style={{ height: '850px', marginTop: '10px', width: '1800px', marginLeft: '-350px' }}>
            <Sider>
                <Menu
                    defaultSelectedKeys={['Dashboard']}
                    mode="inline"
                >
                    <Menu.Item key='Dashboard'>
                        Dashboard
                    </Menu.Item>
                    <SubMenu
                        title={
                            <span>
                                <span>About US</span>
                            </span>
                        }
                    >
                        <Menu.ItemGroup key='AboutUS' title='Country 1'>
                            <Menu.Item key='location1'> Location 1</Menu.Item>
                            <Menu.Item key='location2'> Location 2</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card bordered style={{width: 500, height: 300, float: 'left', margin: 10}} >
                        Asdadsa
                    </Card>
                </Content>
                <Content style={{ padding: '0 50px', marginTop:'-100px' }}>
                    <Breadcrumb>
                        <Breadcrumb.Item>222</Breadcrumb.Item>
                    </Breadcrumb>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by Shrideep</Footer>
            </Layout>
        </Layout>
    )
}