import React from "react";
import { Modal, Tabs } from 'antd';
import ParticipantDetails from "./participantDetails";
import QualificationBids from "./qualBids";
import AuctionBids from "./auctionBids";

const TabPane = Tabs.TabPane;
const data = {
    participant: {
        "Name": 'G G',
        "E-mail": 'metalia.eglon@live.com',
        "Phone": '01234 567 891',
        "Position": '',
        "Address 1": '',
        "Town": '',
        "Zip/Postal Code": '',
        "Country": ""
    },
    company: {
        "Company": "Griseld",
        "Website": "Griseld",
        "Industry": "Griseld",
        "Turnover (£)": "Griseld",
        "Years In Business": "Griseld",
        "Accreditation": "Griseld",
        "Number Of Employees": "Griseld",
    },
    recentActivity: [
        {
            action: 'Last Accessed Event',
            date: 'September 28, 2113 17:58 GMT'
        }, {
            action: 'Accepted By Host',
            date: 'January 03, 2018 08:50 GMT'
        }, {
            action: 'Accepted By Participant',
            date: 'January 03, 2018 08:50 GMT'
        }
    ],
    qualificationBids: [
        {
            lot: 0,
            lotName: 'Test 4',
            ofBidsPlaced: 4,
            status: 'ACTIVE',
            latestBidPrice: '50',
            latestBidValue: '200',
            savingsValue: '10',
            savingsPercentage: '1',
        }, {
            lot: 1,
            lotName: 'Test 5',
            ofBidsPlaced: 2,
            status: 'NOT ACTIVE',
            latestBidPrice: '20',
            latestBidValue: '400',
            savingsValue: '100',
            savingsPercentage: '30',
        }
    ],
    auctionBids: [
        {
            lot: 0,
            lotName: 'Test 4',
            ofBidsPlaced: 4,
            rank: 1,
            latestBidPrice: '50',
            latestBidValue: '200',
            savingsValue: '10',
            savingsPercentage: '1',
            status:'Bidding closed'
        }, {
            lot: 1,
            lotName: 'Test 5',
            ofBidsPlaced: 2,
            rank:2,
            latestBidPrice: '20',
            latestBidValue: '400',
            savingsValue: '100',
            savingsPercentage: '30',
            status: 'Bidding closed',
        }
    ],
};


class ParticipantModal extends React.Component {
    render() {
        return (
            <Modal
                title="Participant Name"
                visible={this.props.visible}
                onOk={this.props.hideModal}
                onCancel={this.props.hideModal}
                cancelButtonProps={{style: {display: 'none'}}}
                centered='true'
                width='1000px'
            >
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="Participant Details" key="1">
                        <ParticipantDetails participantData={data.participant} companyData={data.company}
                                            recentActivityData={data.recentActivity}/>
                    </TabPane>
                    <TabPane tab="Test Case" key="2">
                        <p>Test Case</p>
                    </TabPane>
                    <TabPane tab="Qualification Bids" key="3">
                        <QualificationBids data={data.qualificationBids}/>
                    </TabPane>
                    <TabPane tab="Auction Bids" key="4">
                        <AuctionBids data={data.auctionBids}/>
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }
}

export default ParticipantModal;
