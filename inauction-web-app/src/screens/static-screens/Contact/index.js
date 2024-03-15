import React from "react";
import { Layout } from "antd";
import NotLoggedFooter from "../../../components/NotLoggedFooter/index";
import NotLoggedHeader from "../../../components/NotLoggedHeader/index";
import { Helmet } from "react-helmet";

const { Footer, Header} = Layout;

class Contact extends React.Component {

  render() {
    return (
      <Layout className="gx-app-layout not-logged-in-routes-layout">
        <Helmet>
          <title>Contact - iNauction Tool | Procurement Platform</title>
        </Helmet>
        <Header className="ant-layout-header-not-logged">
          <NotLoggedHeader />
        </Header>
        <div className="gx-app-login-wrap app-register-form">

        </div>
        <Footer>
          <NotLoggedFooter />
        </Footer>
      </Layout>
    );
  }
}


export default Contact;
