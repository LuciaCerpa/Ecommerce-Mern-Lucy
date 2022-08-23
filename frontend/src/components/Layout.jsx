import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './layout.css'
import { useSelector } from 'react-redux'
import Spinner from './Spinner';


const { Header, Sider, Content } = Layout;

const LayoutApp = ({ children }) => {
  const { cartItems, loading } = useSelector(state => state.rootReducer)

  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    localStorage.setItem('carItems', JSON.stringify(cartItems))
  }, [cartItems])
{loading && <Spinner/>}
  return (
    <Layout>
      
      <Sider trigger={null} collapsible collapsed={collapsed} >
      <div className='logo'/>
        <Menu
          theme="default"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}>
          <Menu.Item key='/users' icon={<UserOutlined />} >
            <Link to="/users">User</Link>
          </Menu.Item>
          <Menu.Item key="/home" icon={<HomeOutlined />} >
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/products" icon={<ShopOutlined />} >
            <Link to="/products">Store</Link>
          </Menu.Item>
          <Menu.Item key="/carts" icon={<ShoppingCartOutlined />} >
            <Link to="/carts">Cart</Link>
          </Menu.Item>

          <Menu.Item key="/orders" icon={<ProfileOutlined />} >
            <Link to="/orders">Purchases</Link>
          </Menu.Item>

          <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={()=> {localStorage.removeItem("auth"); navigate("/login")}}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" >
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        >

          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => toggle(),
          })}
          
            <img src='/images/logo/logo.png' alt='logo' className='logo-img' />
          
          <div className="cart-items" onClick={() => navigate('/cart')}>
            <ShoppingCartOutlined/>
            <span className='cart-badge'> {cartItems?.length}</span>
            
          </div>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            color: 'white',
          }}
        >
          {children}
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;