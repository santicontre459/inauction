import React, { Component } from "react";
import { Col, Row } from "antd";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import LoginDetails from "../components/LoginDetails";
import GeneralInformation from "../components/GeneralInformation";
import Address from "../components/Address";
import CompanyDetails from "../components/CompanyDetails";
import Auxiliary from "../../../util/Auxiliary";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { getMainActivities, getUserPositions } from "../../../redux/actions/companyActions";

const customer = JSON.parse(localStorage.getItem('jwtUser'));

class Wall extends Component {
  componentDidMount() {
    this.props.getMainActivities();
    this.props.getUserPositions();
  }
  render() {
    return (
      <Auxiliary>
        <Breadcrumbs description={"Manage Your Account"} name={"Profile"} />
        <Helmet>
          <title>iNauction Tool | {customer?.subrole?.description} | Account Profile</title>
        </Helmet>
        <div className="gx-profile-content">
          <Row gutter={[16, 0]}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <LoginDetails />
              <GeneralInformation />
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Address />
              <CompanyDetails />
            </Col>
          </Row>
        </div>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser }
};

export default connect(mapStateToProps, {
  getMainActivities, getUserPositions
})(Wall);
