import React from "react";
import { Col, Row } from "antd";
import IntlMessages from "util/IntlMessages";
import {Link} from "react-router-dom";
import './index.css';
import { footerText } from "util/config";

const NotLoggedFooter = () => {
  return (
    <div className="gx-layout-footer-content">
        <Row className="app-footer-container" gutter={[24, 0]}>
          <Col className="app-footer-left" lg={8} md={8} sm={24} xs={24}>
            <Link to="#">
              <IntlMessages id="footer.home"/>
            </Link>
            <Link to="/login">
              <IntlMessages id="footer.login"/>
            </Link>
            <Link to="#">
              <IntlMessages id="footer.register"/>
            </Link>
            <Link to="#">
              <IntlMessages id="footer.host"/>
            </Link>
            <Link to="event-list">
              <IntlMessages id="footer.events"/>
            </Link>
            <Link to="/contact">
              <IntlMessages id="footer.contact"/>
            </Link>
          </Col>
          <Col className="app-footer-center" lg={8} md={8} sm={24} xs={24}>
            {footerText}
            <IntlMessages id="footer.reserved"/>
          </Col>
          <Col className="app-footer-right" lg={8} md={8} sm={24} xs={24}>
            <Link to="/about">
              <IntlMessages id="footer.about"/>
            </Link>
            <Link to="/faq">
              <IntlMessages id="footer.faq"/>
            </Link>
            <Link to="terms-and-conditions">
              <IntlMessages id="footer.terms"/>
            </Link>
            <Link to="/privacy-policy">
              <IntlMessages id="footer.privacy"/>
            </Link>
            <Link to="/sitemap">
              <IntlMessages id="footer.sitemap"/>
            </Link>
          </Col>
        </Row>
    </div>
  )
};

export default NotLoggedFooter;
