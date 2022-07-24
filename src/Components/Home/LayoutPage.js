import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  PieChartTwoTone,
  ProfileTwoTone,
  HomeTwoTone,
  FileTwoTone,
  LogoutOutlined,
  CheckSquareTwoTone,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

class LayoutPage extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo">
            <img src={require("../../vmss.png")} alt="VMSS" />
          </div>

          <Menu
            style={{ marginTop: "5px" }}
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
          >
            <Menu.Item key="1" icon={<HomeTwoTone />}>
              <Link to="/"> Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ProfileTwoTone />}>
              <Link to="/Student"> Student Registration </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartTwoTone />}>
              <Link to="/VacDrive"> Vaccination Drive</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<CheckSquareTwoTone />}>
              <Link to="/VacStatus"> Vaccination Status</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<FileTwoTone />}>
              <Link to="/Reports"> Reports</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<LogoutOutlined />}>
              <Link to="/logout"> Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="App-header">
            <span>Vaccination Management System for Schools</span>
          </Header>
          <Content style={{ margin: "0 16px" }}>{this.props.children}</Content>
          <Footer className="App-footer">
            {" "}
            <div>
              <b>Designed & Developed by:</b>
            </div>
            <div>
              <b>
                {" "}
                FSE_Oct_2021 Team: Greeshma Premkumar, Hema Shankar Talupuri,
                Srinivas Rao Davuluri{" "}
              </b>
            </div>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutPage;
