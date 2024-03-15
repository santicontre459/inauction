import React, { Component } from "react";
import { Card, Table } from "antd";

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        jobTitle: 'Web Engineer',
        count: `${i}`,
    });
}

class ExpertsJobTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Job Title',
                    dataIndex: 'jobTitle',
                    sorter: (a, b) => a.jobTitle.length - b.jobTitle.length,
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
            <Card className="gx-card expert-task-form-gx-card input-form-border" title="Expert's Job Title">
                <Table className="gx-table-responsive expert-task-table-gx"
                       size="small"
                       columns={this.state.columns} dataSource={data}
                       pagination={{pageSize: this.state.pageSize}}
                />
            </Card>
        )
    }
}

export default ExpertsJobTitle;