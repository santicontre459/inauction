import React, { Component } from "react";
import { Col, Row } from "antd";
import { Helmet } from "react-helmet";
import Auxiliary from "../../util/Auxiliary";
import { Breadcrumbs } from "../../components/breadcrumbs";
import AllEventsChart from "./components/all-events-chart";
import AllEvents from "./components/all-events";
import EventsInvitationChart from "./components/events-invitation-chart";
import CurrentEvents from "./components/current-events";

const customer = JSON.parse(localStorage.getItem('jwtUser'));

class Analytics extends Component {
    render() {
        return (
            <Auxiliary>
                <Breadcrumbs description={"Statistical Data"} name={"Analytics"}/>
                <Helmet>
                    <title>{`iNauction Tool | ${customer?.subrole?.description} | Analytics`}</title>
                </Helmet>
                <div className="gx-profile-content">
                    <Row gutter={[16, 0]}>
                        <Col lg={12} md={12} sm={24} xs={24}>
                            <AllEventsChart />
                        </Col>
                        <Col lg={12} md={12} sm={24} xs={24}>
                            <EventsInvitationChart />
                        </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <AllEvents />
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <CurrentEvents />
                        </Col>
                    </Row>
                </div>
            </Auxiliary>
        );
    }
}

export default Analytics;
