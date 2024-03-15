import React, { Component } from "react";
import { Card, Table, Button } from "antd";

class QualificationBids extends Component {
    state = {
        expandParticipants: false,
        data: [{
            id: 0,
            name: 'Test 4',
            currentValue: 15,
            qualificationValue: 20,
            test1: 10,
            test2: 10,
            test3: 10,
            bestBidValue: 30,
            leadParticipant: 'Cimi',
            savingsOffered: 10,
            bids: 5
        }, {
            id: 2,
            name: 'Test 5',
            currentValue: 15,
            qualificationValue: 20,
            test1: 10,
            test2: 10,
            test3: 10,
            bestBidValue: 30,
            leadParticipant: 'Cimi',
            savingsOffered: 10,
            bids: 5
        }
        ],
        columns: [
            {
                title: '',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
            }, {
                title: 'Current Value',
                dataIndex: 'currentValue',
                render: (text) => <span>£ {text}</span>,
                sorter: (a, b) => a.currentValue - b.currentValue,
            }, {
                title: 'Qualification Value',
                dataIndex: 'qualificationValue',
                render: (text) => <span>{text ? "£ " + text : null}</span>,
                sorter: (a, b) => a.qualificationValue - b.qualificationValue,
            }, {
                title: 'Test 1',
                dataIndex: 'test1',
                render: (text) => <span>{text ? "£ " + text : null}</span>,
                sorter: (a, b) => a.test1 - b.test1,
                display: 'none',
            }, {
                title: 'Test 2',
                dataIndex: 'test2',
                render: (text) => <span>{text ? "£ " + text : null}</span>,
                sorter: (a, b) => a.test2 - b.test2,
            }, {
                title: 'Test 3',
                dataIndex: 'test3',
                render: (text) => <span>{text ? "£ " + text : null}</span>,
                sorter: (a, b) => a.test3 - b.test3,
            }, {
                title: 'Best Bid Value',
                dataIndex: 'bestBidValue',
                render: (text) => <span>£ {text}</span>,
                sorter: (a, b) => a.bestBidValue - b.bestBidValue,
            }, {
                title: 'Lead Participant',
                dataIndex: 'leadParticipant',
                sorter: (a, b) => a.leadParticipant.localeCompare(b.leadParticipant),
            }, {
                title: 'Savings Offered',
                dataIndex: 'savingsOffered',
                render: (text) => <span>£ {text}</span>,
                sorter: (a, b) => a.savingsOffered - b.savingsOffered,
            }, {
                title: 'Bids',
                dataIndex: 'bids',
                sorter: (a, b) => a.bids - b.bids,
            },
        ],
    };
    componentDidMount = () => {
        const totQualBid = {
            name: "Total:",
            currentValue: 0,
            bestBidValue: 0,
            savingsOffered: 0,
            bids: 0
        };
        this.state.data.map(item => {
            totQualBid.currentValue += parseInt(item.currentValue);
            totQualBid.bestBidValue += parseInt(item.bestBidValue);
            totQualBid.savingsOffered += parseInt(item.savingsOffered);
            totQualBid.bids += parseInt(item.bids);
        });
        const dataClone = this.state.data;
        dataClone.push(totQualBid);
        this.setState({data: dataClone});
    };
    updateColumns = () => {
        this.state.expandParticipants ? this.setState({
            columns: [
                {
                    title: '',
                    dataIndex: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                }, {
                    title: 'Current Value',
                    dataIndex: 'currentValue',
                    render: (text) => <span>£ {text}</span>,
                    sorter: (a, b) => a.currentValue - b.currentValue,
                }, {
                    title: 'Qualification Value',
                    dataIndex: 'qualificationValue',
                    render: (text) => <span>{text ? "£ " + text : null}</span>,
                    sorter: (a, b) => a.qualificationValue - b.qualificationValue,
                }, {
                    title: 'Test 1',
                    dataIndex: 'test1',
                    render: (text) => <span>{text ? "£ " + text : null}</span>,
                    sorter: (a, b) => a.test1 - b.test1,
                    display: 'none',
                }, {
                    title: 'Test 2',
                    dataIndex: 'test2',
                    render: (text) => <span>{text ? "£ " + text : null}</span>,
                    sorter: (a, b) => a.test2 - b.test2,
                }, {
                    title: 'Test 3',
                    dataIndex: 'test3',
                    render: (text) => <span>{text ? "£ " + text : null}</span>,
                    sorter: (a, b) => a.test3 - b.test3,
                }, {
                    title: 'Best Bid Value',
                    dataIndex: 'bestBidValue',
                    render: (text) => <span>£ {text}</span>,
                    sorter: (a, b) => a.bestBidValue - b.bestBidValue,
                }, {
                    title: 'Lead Participant',
                    dataIndex: 'leadParticipant',
                    sorter: (a, b) => a.leadParticipant.localeCompare(b.leadParticipant),
                }, {
                    title: 'Savings Offered',
                    dataIndex: 'savingsOffered',
                    render: (text) => <span>£ {text}</span>,
                    sorter: (a, b) => a.savingsOffered - b.savingsOffered,
                }, {
                    title: 'Bids',
                    dataIndex: 'bids',
                    sorter: (a, b) => a.bids - b.bids,
                }
            ]
        }) : this.setState({
            columns: [
                {
                    title: '',
                    dataIndex: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                }, {
                    title: 'Current Value',
                    dataIndex: 'currentValue',
                    render: (text) => <span>£ {text}</span>,
                    sorter: (a, b) => a.currentValue - b.currentValue,
                }, {
                    title: 'Qualification Value',
                    dataIndex: 'qualificationValue',
                    render: (text) => <span>{text ? "£ " + text : null}</span>,
                    sorter: (a, b) => a.qualificationValue - b.qualificationValue,
                }, {
                    title: 'Best Bid Value',
                    dataIndex: 'bestBidValue',
                    render: (text) => <span>£ {text}</span>,
                    sorter: (a, b) => a.bestBidValue - b.bestBidValue,
                }, {
                    title: 'Lead Participant',
                    dataIndex: 'leadParticipant',
                    sorter: (a, b) => a.leadParticipant.localeCompare(b.leadParticipant),
                }, {
                    title: 'Savings Offered',
                    dataIndex: 'savingsOffered',
                    render: (text) => <span>£ {text}</span>,
                    sorter: (a, b) => a.savingsOffered - b.savingsOffered,
                }, {
                    title: 'Bids',
                    dataIndex: 'bids',
                    sorter: (a, b) => a.bids - b.bids,
                },
            ]
        })
    };

    render() {
        return (
            <Card title="Qualification Bids"
                  className={"gx-card user-profile-gx-card input-form-border all-events-card"}>
                <span className="gx-media-event-details">
                {/*<IntlMessages id=""/>*/} Below you can find the qualification bids of the auction.
                </span>
                <div className="table-operations user-profile-gx-media-card">
                    <Button style={{margin: '10px 0'}} onClick={() => {
                        this.setState({expandParticipants: !this.state.expandParticipants});
                        this.updateColumns();
                    }}>{this.state.expandParticipants ? "+ Expand Participants" : "- Hide Participants"}</Button>
                </div>
                <Table className="gx-table-responsive"
                       columns={this.state.columns}
                       dataSource={this.state.data}
                       bordered

                />
            </Card>
        )
    }
}

export default QualificationBids;