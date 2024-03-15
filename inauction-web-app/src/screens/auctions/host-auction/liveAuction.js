import React, { Component } from "react";
import { Card, Table, Button } from "antd";
import Feed from "../components/liveAuction/feed";
import data from '../components/liveAuction/data';
import HostGraphModal from "../components/liveAuction/hostGraphModal";

class LiveAuction extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        graphModal: false,
        expandParticipants: false,
        notifications: data.notifications,
        data: [
            {
                id: 0,
                name: 'Test 4',
                currentValue: 15,
                test1: 10,
                test2: 10,
                test3: 10,
                bids: 5,
                bestBidValue: 30,
                leadParticipant: 'Cimi',
                savingsOffered: 10,
                activeParticipant: 3,
            }, {
                id: 2,
                name: 'Test 5',
                currentValue: 15,
                test1: 10,
                test2: 10,
                test3: 10,
                bids: 5,
                bestBidValue: 30,
                leadParticipant: 'Cimi',
                savingsOffered: 10,
                activeParticipant: 3,
            }
        ]
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
                    title: 'Bids',
                    dataIndex: 'bids',
                    sorter: (a, b) => a.bids - b.bids,
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
                    title: 'Active Participant',
                    dataIndex: 'activeParticipant',
                    sorter: (a, b) => a.activeParticipant - b.activeParticipant,
                }, {
                    title: '',
                    dataIndex: 'bid',
                    render: () => <Button onClick={
                        () => {
                            this.setState({graphModal: !this.state.graphModal})
                        }
                    }><i className="icon icon-amchart"/></Button>
                },
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
                    title: 'Bids',
                    dataIndex: 'bids',
                    sorter: (a, b) => a.bids - b.bids,
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
                    title: 'Active Participant',
                    dataIndex: 'activeParticipant',
                    sorter: (a, b) => a.activeParticipant - b.activeParticipant,
                }, {
                    title: '',
                    dataIndex: '',
                    render: () => <Button onClick={
                        () => {
                            this.setState({graphModal: !this.state.graphModal})
                        }
                    }><i className="icon icon-amchart"/></Button>
                },
            ]
        })
    };

    componentDidMount() {
        this.updateColumns();
    }

    handleSubmitCancel = () => {
        this.setState({
            graphModal: false,
        });
    };

    render() {
        return (
            <Card title="Live Auction"
                  className={"gx-card user-profile-gx-card input-form-border all-events-card"}>
                <Feed notifications={this.state.notifications}/>
                <HostGraphModal
                    eventName={"Current Bid : Test"}
                    visibility={this.state.graphModal}
                    onOk={this.handleSubmitCancel}
                />
                <div className="gx-media-event-details" style={{marginTop: "15px"}}>
                    {/*<IntlMessages id=""/>*/} Below you can find the bids for the auction.
                </div>
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

export default LiveAuction;
