import React from 'react'
import IntlMessages from "util/IntlMessages";
import '../styles/login.css';
import NotLoggedFooter from "../components/NotLoggedFooter/index";
import NotLoggedHeader from "../components/NotLoggedHeader/index";
import { Link } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Divider
} from "antd";
import { Helmet } from "react-helmet";
const { Footer, Header} = Layout;

const iNauctionToolPlatformWaiting = () => {
  return (
    <Layout className="gx-app-layout">
      <Helmet>
        <title>iNauction Tool Platform Waiting - iNauction Tool | Procurement Platform</title>
      </Helmet>
      <Header className="ant-layout-header-not-logged">
          <NotLoggedHeader />
      </Header>
      <div className="gx-app-login-wrap app-register-form">
        <div className="gx-app-login-container gx-host-form-register" style={{display: "block"}}>
          <div className="gx-app-login-main-content">
            <div className="gx-app-register-content app-register-form">
              <div className="gx-app-message-content company-verification-success">
                <div className="gx-app-logo-wid">
                  <div className="icon icon-check" />
                  <h3><IntlMessages id="app.userAuth.tool.platform.waiting.title"/></h3>
                  <h4><IntlMessages id="app.userAuth.tool.platform.waiting.subTitle1"/> <br/>
                      <IntlMessages id="app.userAuth.tool.platform.waiting.subTitle2"/>
                  </h4>
                  <h5 className="light_gray"><IntlMessages id="app.userAuth.tool.platform.waiting.label1"/><br/>
                      <IntlMessages id="app.userAuth.tool.platform.waiting.label2"/>
                      <a href="mailto:contact@inegotio.com"> <IntlMessages id="app.userAuth.tool.platform.waiting.email"/> </a>
                  </h5>
                </div>
              </div>
              <Divider />
              <Row className="app-bottom-register" gutter={16}>
                <Col lg={24} md={10} sm={24} xs={24}>
                  <div className="logo_signup gx-app-logo" style={{width: '100%', textAlign: 'center'}}>
                    <img alt="logo_signup" style={{maxWidth: 200}}  src={require("assets/images/inauction_logo.png")}/>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <NotLoggedFooter />
      </Footer>
    </Layout>
  );
};

export default iNauctionToolPlatformWaiting;
