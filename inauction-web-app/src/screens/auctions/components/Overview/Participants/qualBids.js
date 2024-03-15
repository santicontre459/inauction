import React from "react";
import { Table, Tag } from 'antd';

const columns = [
    {
        title: 'Lot',
        dataIndex: 'lot',
        align: 'center',
        key: 'lot',
    },
    {
        title: 'Lot Name',
        dataIndex: 'lotName',
        align: 'center',
        key: 'lotName',
    },
    {
        title: 'Of Bids Placed',
        dataIndex: 'ofBidsPlaced',
        align: 'center',
        key: 'ofBidsPlaced',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        key: 'status',
        render: status => status === "ACTIVE" ? <Tag color="green">ACTIVE</Tag> : <Tag color="red">{status}</Tag>
    },
    {
        title: 'Latest Bid Price',
        dataIndex: 'latestBidPrice',
        align: 'center',
        key: 'latestBidPrice',
        render: latestBidPrice => <span>£ {latestBidPrice}</span>
    },
    {
        title: 'Latest Bid Value',
        dataIndex: 'latestBidValue',
        align: 'center',
        key: 'latestBidValue',
        render: latestBidValue => <span>£ {latestBidValue}</span>
    },
    {
        title: 'Savings Value',
        dataIndex: 'savingsValue',
        align: 'center',
        key: 'savingsValue',
        render: savingsValue => <span>£ {savingsValue}</span>
    },
    {
        title: 'Savings Percentage',
        dataIndex: 'savingsPercentage',
        align: 'center',
        key: 'savingsPercentage',
        render: savingsPercentage => <span>{savingsPercentage} %</span>
    },
];

class QualBids extends React.Component {
    totQualBid;
    addTotalQualificationBids = () => {
        this.totQualBid = {
            lot: "Total:",
            lotName: '',
            ofBidsPlaced: '',
            status: '',
            latestBidPrice: 0,
            latestBidValue: 0,
            savingsValue: 0,
            savingsPercentage: 0,
        };
        this.props.data.map(item => {
            this.totQualBid.latestBidPrice += parseInt(item.latestBidPrice);
            this.totQualBid.latestBidValue += parseInt(item.latestBidValue);
            this.totQualBid.savingsValue += parseInt(item.savingsValue);
            this.totQualBid.savingsPercentage += parseInt(item.savingsPercentage);
            return null;
        });
        console.log(this.totQualBid);
        console.log(this.props.data);
        this.props.data.push(this.totQualBid);
    };

    render() {
        this.addTotalQualificationBids();
        return (

            <Table title={() => <span style={{color: '#262626', fontSize: '16px'}}>Qualification Bids</span>}
                   columns={columns} dataSource={this.props.data} pagination={false} bordered={true}/>
        );
    }
}

export default QualBids;