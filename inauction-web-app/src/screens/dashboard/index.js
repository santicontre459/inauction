import React, { Component } from "react";
import Auxiliary from "../../util/Auxiliary";
import { Col, Row } from "antd";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../components/breadcrumbs";
import './index.css'
import IntlMessages from "../../util/IntlMessages";
import InfoWelcomeCard from "./components/InfoWelcomeCard";
import EventAudience from "./components/EventAudience";
import EventStatistics from "./components/EventStatistics";
import InTotalRevenueCard from "./components/InTotalRevenueCard";
import InNewBidders from "./components/InNewBidders";
import InGrowthCard from "./components/InGrowthCard";
import InRecentActivity from "./components/InRecentActivity";
import InTaskList from "./components/InTaskList";
import IconWithTextCard from "./components/IconWithTextCard";
import Widget from "../../components/Widget";
import { recentActivity, taskList, trafficData } from "./data";

const customer = JSON.parse(localStorage.getItem('jwtUser'));

//class
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <Auxiliary>
                <Helmet>
                    <title>iNauction Tool | {customer.subrole.description} | Dashboard</title>
                </Helmet>
                <Breadcrumbs description = {"Dashboard"} name = {"Dashboard"} />
                <Row gutter={[16, 0]}>
                    <Col span={24}>
                        <div className="gx-card input-form-border">
                            <div className="gx-card-body">
                                <Row gutter={[16, 0]}>
                                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                        <InfoWelcomeCard name={customer.firstName}/>
                                    </Col>
                                    <Col xl={6} lg={12} md={12} sm={12} xs={24} className="gx-audi-col">
                                        <EventStatistics/>
                                    </Col>

                                    <Col xl={12} lg={24} md={24} sm={24} xs={24} className="gx-visit-col">
                                        <EventAudience/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col xl={8} lg={24} md={8} sm={24} xs={24}>
                        <div className="gx-card input-form-border">
                            <InTotalRevenueCard/>
                        </div>
                    </Col>
                    <Col xl={8} lg={12} md={8} sm={24} xs={24}>
                        <div className="gx-card input-form-border">
                            <InNewBidders/>
                        </div>
                    </Col>
                    <Col xl={8} lg={12} md={8} sm={24} xs={24}>
                        <div className="gx-card input-form-border">
                            <InGrowthCard trafficData={trafficData}/>
                        </div>
                    </Col>

                    <Col xl={8} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-2">
                        <Widget>
                            <InRecentActivity recentList={recentActivity} shape="circle"/>
                        </Widget>
                    </Col>

                    <Col xl={16} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-1">
                        <Row gutter={[16, 0]}>
                            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                <IconWithTextCard
                                  cardColor="cyan"
                                  icon="diamond"
                                  title="09"
                                  subTitle={<IntlMessages id="user.dashboard.stats.events" />}
                                />
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                <IconWithTextCard
                                  cardColor="orange"
                                  icon="tasks"
                                  title="687"
                                  subTitle={<IntlMessages id="user.dashboard.stats.tasks" />}
                                />
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                <IconWithTextCard
                                  cardColor="teal"
                                  icon="team"
                                  title="04"
                                  subTitle={<IntlMessages id="user.dashboard.stats.experts" />}
                                s/>
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                <IconWithTextCard
                                  cardColor="red"
                                  icon="files"
                                  title="09"
                                  subTitle={<IntlMessages id="user.dashboard.stats.docs" />}
                                />
                            </Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <InTaskList taskList={taskList}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Auxiliary>
        )
    }
}
export default Dashboard;
