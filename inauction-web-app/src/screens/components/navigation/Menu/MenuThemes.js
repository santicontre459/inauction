import React, {Component} from "react";

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import { Card, Menu, Switch } from "antd";

const SubMenu = Menu.SubMenu;

class MenuThemes extends Component {

  state = {
    theme: 'dark',
    current: '1',
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Card className="gx-card" title="Menu Themes">
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"/>
        <br/>
        <br/>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{width: 256}}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline">
          <SubMenu key="sub1" title={<span><MailOutlined /><span>Navigation One</span></span>}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><AppstoreOutlined /><span>Navigtion Two</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><SettingOutlined /><span>Navigation Three</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </Card>
    );
  }

}


export default (MenuThemes);
