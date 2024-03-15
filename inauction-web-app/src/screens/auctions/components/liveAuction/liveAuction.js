import React, { Component } from "react";
import { Card, Table, Button, Modal, InputNumber, Tag, Badge, Alert } from "antd";
import Feed from "./feed";
import data from './data';
import GraphModal from "./graphModal";

const confirm = Modal.confirm;

class   LiveAuction extends Component {

    constructor(props) {
        super(props);
        this.showRejectLotConfirm = this.showRejectLotConfirm.bind(this);
    }

    state = {
        graphModal: false,
        displayAlertOutOfPriceRange: false,
        lots: data.lots,
        notifications: data.notifications,
        columns: [
            {
                title: 'Lot',
                dataIndex: 'lot',
                sorter: (a, b) => a.lot - b.lot,
            }, {
                title: 'Lot Name',
                dataIndex: 'lotName',
                sorter: (a, b) => a.lotName.localeCompare(b.lotName),
            }, {
                title: 'Quantity X Unit Of Measure (UOM)',
                dataIndex: 'quantity',
                render: (text, record) => <span> {text} x {record.unitOfMeasureUOM}</span>,
                sorter: (a, b) => a.quantity - b.quantity,
            }, {
                title: 'Bid Range',
                dataIndex: 'minBid',
                render: (text, record) => <span> ${text} - ${record.maxBid}</span>,
                sorter: (a, b) => a.minBid - b.minBid,
            }, {
                title: 'Your Price Per UOM',
                className: 'column-money',
                dataIndex: 'yourPricePerUOM',
                render: (text, record) => <div style={{width: "100%", textAlign: "center"}}>
                    {record.bidStatus === "inProgress" ? (
                        <InputNumber
                            style={{width: "100%"}}
                            defaultValue={record.yourPricePerUOM}
                            max={record.maxBid}
                            min={record.minBid}
                            step={0.01}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={(value) => {
                                this.pricePerUOMChange(value, record)
                            }}
                            onKeyUp={(e) => {
                                console.log(e.target.value);
                                console.log(parseFloat(e.target.value.replace('$ ', '')));
                                if (parseFloat(e.target.value.replace('$ ', '')) > record.maxBid || parseFloat(e.target.value.replace('$ ', '')) < record.minBid) {
                                    this.setState({displayAlertOutOfPriceRange: true})
                                } else {
                                    this.setState({displayAlertOutOfPriceRange: false})
                                }
                            }}
                        />
                    ) : (
                        text ? (<span>$ {text}</span>) : (text)
                    )}
                </div>,
                sorter: (a, b) => a.yourPricePerUOM - b.yourPricePerUOM,
            }, {
                title: 'Total Lot Value Placed',
                className: 'column-money',
                dataIndex: 'totalLotValuePlaced',
                render: text => <span>$ {text}</span>,
                sorter: (a, b) => a.totalLotValuePlaced - b.totalLotValuePlaced,
            }, {
                title: 'Your Rank',
                dataIndex: 'rank',
                render: text => <div style={{height: "100%", textAlign: "center"}}>
                    <Badge count={text}
                           style={
                               text === 1 ? ({
                                   backgroundColor: '#3e869c',
                                   color: '#fff',
                                   boxShadow: '0 0 0 1px #d9d9d9 inset'
                               }) : ({
                                   color: '#fff',
                                   boxShadow: '0 0 0 1px #d9d9d9 inset'
                               })
                           }/>
                </div>,
                sorter: (a, b) => a.rank - b.rank,
            }, {
                title: 'Bid Status',
                dataIndex: 'bidStatus',
                width: '23%',
                render: (text, record) =>
                    <div style={{width: "100%", textAlign: "center"}} >
                        {text === "rejected" ? (
                            <Tag className="table-event-label" color="red" style={{marginTop: "5px"}}>
                                Lot Rejected
                            </Tag>
                        ) : <span/>}
                        {text === "completedBid" ? (
                            <div>
                                <Tag className="table-event-label" color="blue" style={{marginTop: "5px"}}>
                                    Bid Submitted
                                </Tag>
                                <Tag style={{paddingTop: "3px", paddingBottom: "1px"}} onClick={() => {
                                    this.setState({graphModal: true,});
                                }}>
                                    <i className="icon icon-amchart"/>
                                </Tag>
                            </div>
                        ) : <span/>}
                        {text === "noBid" ? (
                            <div className='bid-sts'>
                                <Button className='bide' style={{margin: "5px"}} type="default" onClick={() => this.placeBid(record)}
                                        ghost>Place Bid</Button>
                                <Button style={{margin: "5px"}} type="danger"
                                        onClick={() => this.showRejectLotConfirm(record)} ghost>Reject
                                    lot</Button>
                            </div>) : <span/>
                        }
                        {text === "inProgress" ? (<div>
                            <Button style={{margin: "5px"}} type="primary" onClick={() => this.submitBid(record)}
                                    ghost>Submit</Button>
                            <Button style={{margin: "5px"}} type="danger"
                                    onClick={() => this.cancelSubmitBid(record)}
                                    ghost>Cancel</Button>
                        </div>) : <span/>}
                    </div>,
                sorter: (a, b) => a.bidStatus.localeCompare(b.bidStatus),
            }]
    };

    placeBid = (record) => {
        let objIndex = this.state.lots.findIndex((obj => obj.lot === record.lot));
        this.setState({state: this.state.lots[objIndex].bidStatus = "inProgress"});
    };

    showRejectLotConfirm = (record) => {
        confirm({
            title: 'Are you sure you want to reject the lot?',
            content: 'Press Ok to continue, Cancel to return',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                let objIndex = this.state.lots.findIndex((obj => obj.lot === record.lot));
                this.setState({state: this.state.lots[objIndex].bidStatus = "rejected"});
            },
            onCancel: () => {
            },
        });
    };

    submitBid = (record) => {
        this.setState({
            visible: true,
            record
        });
    };

    handleSubmitOk = () => {
        let objIndex = this.state.lots.findIndex((obj => obj.lot === this.state.record.lot));
        this.setState({state: this.state.lots[objIndex].bidStatus = "completedBid"});
        this.setState({state: this.state.lots[objIndex].rank = 1});
        this.setState({
            visible: false,
            record: null
        });
    };
    handleSubmitCancel = () => {
        this.setState({
            visible: false,
            graphModal: false,
        });
    };
    cancelSubmitBid = (record) => {
        let objIndex = this.state.lots.findIndex((obj => obj.lot === record.lot));
        this.setState({state: this.state.lots[objIndex].bidStatus = "noBid"});
        this.setState({state: this.state.lots[objIndex].yourPricePerUOM = ""});
        this.setState({state: this.state.lots[objIndex].totalLotValuePlaced = "0"});
    };
    pricePerUOMChange = (value, record) => {
        if (value < record.maxBid || value > record.minBid) {
            this.setState({displayAlertOutOfPriceRange: false})
        }
        let objIndex = this.state.lots.findIndex((obj => obj.lot === record.lot));
        this.setState({state: this.state.lots[objIndex].yourPricePerUOM = value});
        this.setState({state: this.state.lots[objIndex].totalLotValuePlaced = (value * record.quantity).toFixed(2)});
    };

    render() {
        return (
            <Card title="Live Auction"
                  className={"gx-card user-profile-gx-card input-form-border all-events-card"}>
                <Feed notifications={this.state.notifications}/>
                <Modal
                    title="Are you sure to submit?"
                    visible={this.state.visible}
                    onOk={this.handleSubmitOk}
                    onCancel={this.handleSubmitCancel}
                >
                    <p>Please confirm...</p>
                </Modal>
                <GraphModal
                    eventName={"Event test"}
                    visibility={this.state.graphModal}
                    onOk={this.handleSubmitCancel}
                />
                <div className="gx-media-event-details" style={{marginTop: "15px"}}>
                    {/*<IntlMessages id=""/>*/} Below you can find the bids for the auction.
                </div>
                {
                    this.state.displayAlertOutOfPriceRange ? (
                        <Alert
                            style={{margin:"20px 0"}}
                            message="Warning"
                            description="Bid must be between the Bid Range limits!"
                            type="warning"
                            showIcon
                        />
                    ) : <span/>
                }
                <Table className="gx-table-responsive user-profile-gx-media-card"
                       style={{paddingTop: "5px"}}
                       columns={this.state.columns}
                       dataSource={this.state.lots}
                       bordered
                />
            </Card>
        )
    }
}

export default LiveAuction;
