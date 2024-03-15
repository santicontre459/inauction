import React from 'react'
import {connect} from 'react-redux'
import {resendEmail} from '../redux/actions/authActions';
import IntlMessages from "util/IntlMessages";
import '../styles/login.css';
import NotLoggedFooter from "../components/NotLoggedFooter/index";
import NotLoggedHeader from "../components/NotLoggedHeader/index";
import {
  Layout,
  Row,
  Col,
  Divider, message
} from "antd";
import { Helmet } from "react-helmet";
import isEmpty from "../util/isEmpty";
const { Footer, Header} = Layout;

class BidderRegistrationSuccess extends React.Component {

  // handle error response
  handleOnError = (error) => {
    if (error) {
      setTimeout(() => {
        this.props.clearErrors();
      }, 3000);
      return message.error(this.props.errors.message);
    } else {
      return null;
    }
  };

  // handle success response
  handleOnSuccess = () => {
    const { emailResent } = this.props.authNew;
    if (emailResent) {
      setTimeout(() => {}, 4000);
      return message.success('Verification email has been resend successfully!');
    }
    else {
      return null;
    }
  };

  componentDidUpdate(prevProps, prevState) {

    if (this.props.authNew.isAuthenticated !== prevProps.authNew.isAuthenticated) {
      this.props.history.push('/')
    }

    // handle error and success responses
    {!isEmpty(this.props.errors) ? this.handleOnError(!isEmpty(this.props.errors)) : this.handleOnSuccess()}
  }

  render() {
    return (
      <Layout className="gx-app-layout not-logged-in-routes-layout">
        <Helmet>
          <title>Bidder Registration Success - iNauction Tool | Procurement Platform</title>
        </Helmet>
        <Header className="ant-layout-header-not-logged">
          <NotLoggedHeader/>
        </Header>
        <div className="gx-app-login-wrap app-register-form">
          <div className="gx-app-login-container gx-host-form-register">
            <div className="gx-app-login-main-content" style={{ width: '100%' }}>
              <div className="gx-app-register-content app-register-form">
                <div className="gx-app-message-content bidder-registration-content">
                  <div className="gx-app-logo-wid">
                    <div className="icon icon-check"/>
                    <h3><IntlMessages id="app.userAuth.bidder.registration.success.title"/></h3>
                    <h4><IntlMessages id="app.userAuth.bidder.registration.success.subTitle"/></h4>
                    <h4><IntlMessages id="app.userAuth.bidder.registration.success.label"/></h4>
                    <h5>
                      <a onClick={() => (this.props.resendEmail(this.props.authNew.user.id))}>If token expired click here to get a new one</a>
                    </h5>
                  </div>
                </div>
                <Divider/>
                <Row className="app-bottom-register" gutter={16}>
                  <Col lg={24} md={10} sm={24} xs={24}>
                    <div className="logo_signup gx-app-logo" style={{ width: '100%', textAlign: 'center' }}>
                      <img alt="logo_signup" style={{ maxWidth: 200 }} src={require("assets/images/inauction_logo.png")}/>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <Footer>
          <NotLoggedFooter/>
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = ({authNew}) => {
  return {authNew}
};

export default connect(mapStateToProps, {resendEmail})(BidderRegistrationSuccess);
