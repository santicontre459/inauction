import React, {Component} from "react";
import { Card, Table } from "antd";

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        expert: 'Stevie Wonder',
        count: `${i}`,
    });
}

class EventExpertsRelationships extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '#Code',
                    dataIndex: 'key',
                    sorter: (a, b) => a.key.length - b.key.length,
                }, {
                    title: 'Expert',
                    dataIndex: 'expert',
                    sorter: (a, b) => a.expert.length - b.expert.length,
                }, {
                    title: 'Count',
                    dataIndex: 'count',
                    sorter: (a, b) => a.count.length - b.count.length,
                },
            ]
        }
    }

    render() {
        return (
            <Card className="gx-card expert-task-form-gx-card input-form-border" title="Event-Experts Relationships">
                <Table className="gx-table-responsive expert-task-table-gx"
                       size="small"
                       columns={this.state.columns} dataSource={data}
                       pagination={{pageSize: this.state.pageSize}}
                />
            </Card>
        )
    }
}

export default EventExpertsRelationships;