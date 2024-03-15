import React, { Component } from "react";
import { Card, Table } from "antd";

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        expert: `Stevie ${i}`,
        fullName: 'Stevie Wonder',
        lastLogged: `2019-10-25 20:30:35`,
    });
}

class LastLoggedExperts extends Component {
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
                    title: 'Full Name',
                    dataIndex: 'fullName',
                    sorter: (a, b) => a.fullName.length - b.fullName.length,

                }, {
                    title: 'Last Logged',
                    dataIndex: 'lastLogged',
                    sorter: (a, b) => a.lastLogged.length - b.lastLogged.length,

                },
            ],
        }
    }

    render() {
        return (

            <Card className="gx-card expert-task-form-gx-card input-form-border" title="Last Logged Experts">
                <Table className="gx-table-responsive expert-task-table-gx"
                       size="small"
                       columns={this.state.columns} dataSource={data}
                       pagination={{pageSize: this.state.pageSize}}/>
            </Card>
        )
    }
}

export default LastLoggedExperts;