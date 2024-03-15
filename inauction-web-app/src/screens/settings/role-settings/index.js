import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Col, Row } from "antd";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import LastLoggedExperts from "./components/lastLoggedExperts";
import EventExpertsRelationships from "./components/eventExpertsRelationships";
import ExpertsJobTitle from "./components/expertsJobTitle";
import TotalExperts from "./components/totalExperts";
import '../index.css'

const customer = JSON.parse(localStorage.getItem('jwtUser'));

//class
class RoleSettings extends Component {
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
                    <title>iNauction Tool | {customer.subrole.description} | Settings - Role Settings</title>
                </Helmet>
                <Breadcrumbs description={"Settings - Role Settings"} name={"Role Settings"}/>
                <Row gutter={[16, 0]}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <TotalExperts/>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <ExpertsJobTitle/>
                    </Col>
                </Row>
                <Row gutter={[16, 0]}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <LastLoggedExperts/>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <EventExpertsRelationships/>
                    </Col>
                </Row>
            </Auxiliary>
        )
    }
}

export default RoleSettings;