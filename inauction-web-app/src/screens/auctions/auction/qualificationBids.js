import React, { Component } from "react";
import { Card, Table, Button, Modal, InputNumber, Tag } from "antd";

const confirm = Modal.confirm;

const data =  [
        {
            lot: 1,
            lotName: 'Excavator',
            quantity: 1,
            unitOfMeasureUOM: 'pieces',
            yourPricePerUOM: '',
            totalLotValuePlaced: '0',
            bidStatus: 'noBid',
        }, {
            lot: 2,
            lotName: 'Truck',
            quantity: 5,
            unitOfMeasureUOM: 'pieces',
            yourPricePerUOM: '',
            totalLotValuePlaced: '0',
            bidStatus: 'noBid',
        }, {
            lot: 3,
            lotName: 'Steel',
            quantity: 100,
            unitOfMeasureUOM: 'KG',
            yourPricePerUOM: '',
            totalLotValuePlaced: '0',
            bidStatus: 'noBid',
        }
    ];

class QualificationBids extends Component {
    constructor(props) {
        super(props);
        this.showRejectLotConfirm = this.showRejectLotConfirm.bind(this);
    }

    state = {
        data,
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
                title: 'Your Price Per UOM',
                className: 'column-money',
                dataIndex: 'yourPricePerUOM',
                render: (text, record) => <div style={{width: "100%", textAlign: "center"}}>
                    {record.bidStatus === "inProgress" ? (
                        <InputNumber
                            style={{width: "100%"}}
                            defaultValue={record.yourPricePerUOM}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={(value) => this.pricePerUOMChange(value, record)}
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
                title: 'Bid Status',
                dataIndex: 'bidStatus',
                width: '23%',
                render: (text, record) =>
                    <div style={{width: "100%", textAlign: "center"}} className="bid-sts">
                        {text === "rejected" ? (
                            <Tag className="table-event-label" color="red" style={{marginTop: "5px"}}>
                                Lot Rejected
                            </Tag>) : <span/>}
                        {text === "completedBid" ? (
                            <Tag className="table-event-label" color="blue" style={{marginTop: "5px"}}>
                                Bid Submitted
                            </Tag>) : <span/>}
                        {text === "noBid" ? (
                            <div>
                                <Button className="bide" style={{margin: "5px"}} type="default" onClick={() => this.placeBid(record)}
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
        let objIndex = this.state.data.findIndex((obj => obj.lot === record.lot));
        this.setState({state: this.state.data[objIndex].bidStatus = "inProgress"});
    };

    showRejectLotConfirm = (record) => {
        confirm({
            title: 'Are you sure you want to reject the lot?',
            content: 'Press Ok to continue, Cancel to return',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                let objIndex = this.state.data.findIndex((obj => obj.lot === record.lot));
                this.setState({state: this.state.data[objIndex].bidStatus = "rejected"});
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
        let objIndex = this.state.data.findIndex((obj => obj.lot === this.state.record.lot));
        this.setState({state: this.state.data[objIndex].bidStatus = "completedBid"});
        this.setState({
            visible: false,
            record: null
        });
    };
    handleSubmitCancel = () => {
        this.setState({
            visible: false,
        });
    };
    cancelSubmitBid = (record) => {
        let objIndex = this.state.data.findIndex((obj => obj.lot === record.lot));
        this.setState({state: this.state.data[objIndex].bidStatus = "noBid"});
        this.setState({state: this.state.data[objIndex].yourPricePerUOM = ""});
        this.setState({state: this.state.data[objIndex].totalLotValuePlaced = "0"});
    };
    pricePerUOMChange = (value, record) => {
        let objIndex = this.state.data.findIndex((obj => obj.lot === record.lot));
        this.setState({state: this.state.data[objIndex].yourPricePerUOM = value});
        this.setState({state: this.state.data[objIndex].totalLotValuePlaced = value * record.quantity});
    };

    render() {
        return (
            <Card title="Qualification Bids"
                  className={"gx-card user-profile-gx-card input-form-border all-events-card"}>
            <span className="gx-media-event-details">
            {/*<IntlMessages id=""/>*/} Below you can find the qualification bids of the auction.
            </span>
                <Modal
                    title="Are you sure to submit?"
                    visible={this.state.visible}
                    onOk={this.handleSubmitOk}
                    onCancel={this.handleSubmitCancel}
                >
                    <p>Please confirm...</p>
                </Modal>
                <Table className="gx-table-responsive user-profile-gx-media-card"
                       style={{paddingTop: "16px"}}
                       columns={this.state.columns}
                       dataSource={this.state.data}
                       bordered
                />
            </Card>
        )
    }
}

export default QualificationBids;
