import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Col, Row } from "antd";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import Verification from "./components/verification";
import Blacklist from "./components/blacklist";
import '../index.css';

const customer = JSON.parse(localStorage.getItem('jwtUser'));

// class
class CompanyStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return (
      <Auxiliary>
        <Helmet>
          <title>iNauction Tool | {customer.subrole.description} | Settings - Company Status</title>
        </Helmet>
        <Breadcrumbs description={"Settings - Company Status"} name={"Company Status"}/>
        <Row gutter={[16, 0]}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Verification/>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Blacklist/>
          </Col>
        </Row>
      </Auxiliary>
    )
  }
}

export default CompanyStatus;
