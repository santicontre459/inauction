import React from "react";
import { Row, Col, Table } from 'antd';
import OverviewItem from "../overviewItem";
import Auxiliary from "../../../../../util/Auxiliary";

const columns = [
    {
        title: 'ACTION',
        dataIndex: 'action',
        align: 'center',
        key: 'action',
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        align: 'center',
        key: 'date',
    }
];
class ParticipantDetails extends React.Component {
    render() {
        return (
            <Auxiliary>
                <Row>
                    <Col span={12}>
                        <OverviewItem title="Participant" data={this.props.participantData}/>
                    </Col>
                    <Col span={12}>
                        <OverviewItem title="Company" data={this.props.companyData}/>
                    </Col>
                </Row>
                <Table title={() => <span style={{color: '#262626', fontSize: '16px'}}>Recent Activity</span>}
                       columns={columns} dataSource={this.props.recentActivityData} pagination={false}/>
            </Auxiliary>
        );
    }
}

export default ParticipantDetails;