import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Col, Row, Table } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import '../index.css'

const customer = JSON.parse(localStorage.getItem('jwtUser'));
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        code: `#${i}`,
        activity: 'Ndertim HEC.',
        event: `Ndertim Hidrocentrali.`
    });
}

class Activities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: 'Code',
                dataIndex: 'code',
                sorter: (a, b) => a.code.length - b.code.length,
            }, {
                title: 'Activity',
                dataIndex: 'activity',
                sorter: (a, b) => a.activity.length - b.activity.length,

            }, {
                title: 'Event',
                dataIndex: 'event',
                sorter: (a, b) => a.event.length - b.event.length,
            }
            ],
            pageSize: 10,
            y: 400
        }
    }


    componentDidMount() {
    }


    render() {
        return (
            <Auxiliary>
                <Helmet>
                    <title>iNauction Tool | {customer.subrole.description} | Settings - Event Related Activities</title>
                </Helmet>

                <Breadcrumbs description={"Settings - Event Related Activities"} name={"Event Related Activities"} />

                <div className="gx-main-content">
                    <Row gutter={[16, 0]}>
                        <Col span={24}>
                            <Card className="gx-card activity-form-gx-card input-form-border" title="All Activities">
                                <span className="gx-media-input-form-details">
                                    <span> List of all activities that are being used on all your events</span>
                                </span>
                                <Button type="button" className="ant-btn activities-list-btn ant-btn-md" style={{marginRight:"5px"}}>
                                    <Link to={"/settings/activities"}>
                                        <i className="icon icon-navigation"/>
                                        <span>All Activities</span></Link>
                                </Button>
                                <Table className="gx-table-responsive activities-table-gx-media-card" size="small" columns={this.state.columns} dataSource={data} pagination={{ pageSize: this.state.pageSize }}
                                    scroll={{ y: this.state.y }} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Auxiliary>
        )
    }
}
export default Activities;
