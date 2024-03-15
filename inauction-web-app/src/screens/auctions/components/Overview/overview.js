import React, { Component, useEffect } from "react";
import { Card, List } from "antd";
import moment from "moment";
import OverviewItem from './overviewItem';
import { formatCurrency } from "../../../../util/common";
import { eventTypes } from "../../../events/create-event/Constants";

const Overview = ({ data = {} }) => {
    const getQuestionnaireDetails = () => {
        const questionnaire = [];
        if (data.questionNaires == null) {
            return questionnaire;
        }
        Object.keys(data.questionNaires).map(function (key) {
            questionnaire.push(
                {
                    "Questionnaire Name": key,
                    "Question Quantity": data.questionNaires[key].questions?.length ?? 0,
                    "Deadline": data.questionNaires[key].deadline,
                }
            )
        });
        return questionnaire;
    };

    const getAuctionDetails = () => {
        let start = null;
        let deadline = null;
        let bid_direction = null;
        if (data.eventType == eventTypes.RFQ && data.rfqs && data.rfqs.length > 0) {
            start = new Date(data.rfqs[0].createdAt);
            deadline = new Date(data.rfqs[0].bidDeadline);
            bid_direction = data.rfqs[0].bidDirection == 0 ? 'FORWARD' : data.rfqs[0].bidDirection == 1 ? 'REVERSE' : null;
        }
        else if (data.eventType == eventTypes.OA && data.onlineAuctions && data.onlineAuctions.length > 0) {
            start = new Date(data.onlineAuctions[0].startTime);
            deadline = new Date(data.onlineAuctions[0].deadline);
            bid_direction = data.onlineAuctions[0].bidDirection == 0 ? 'FORWARD' : data.onlineAuctions[0].bidDirection == 1 ? 'REVERSE' : null;
        }
        else if (data.eventType == eventTypes.NONE && data.questionNaires && data.questionNaires.length > 0) {
            start = new Date(data.questionNaires[0].createdAt);
            deadline = new Date(data.questionNaires[0].deadline);
        }

        let details = {
            'Auction Start Time': moment(start).format('LLLL'),
            'Auction Deadline': moment(deadline).format('LLLL'),
            'Event Type': data.eventType == 0 ? 'RFQ' : data.eventType == 1 ? 'Online Auction' : 'Only Questionnaire',
        }
        if (bid_direction) {
            details['Bid Direction'] = bid_direction;
        }
        return details;
    }

    const popOverviewToRender = () => {
        const questionnaireToRender = [
            <div className="auct-row" >
                <h4 className="gx-mt-0">Event Description</h4>
                <p className="gx-mb-2">
                    {data.description}
                </p>
            </div>,
            <OverviewItem title="Host Contact Details" data={{
                Name: `${data.host?.firstName} ${data.host?.lastName}`,
                Email: data.host?.email,
                Phone: data.host?.phoneNumber
            }} />,
            <OverviewItem title="Event" data={{
                'Reference Number': data.referenceNumber,
                'Event Name': `${data.host?.firstName} ${data.host?.lastName}`,
                'Event Type': data.eventType == 0 ? 'RFQ' : data.eventType == 1 ? 'Online Auction' : 'Only Questionnaire',
                'Default Currency': data.currency?.title,
                'Budget': data.defineBudget != true ? 'Not Defined' : formatCurrency(data.totalBudget, data.currency?.title, false),
                'Experts': data.expertsNumber,
                'Created Date': moment(data.createdAt).format('LLLL'),
            }} />,
            <OverviewItem title="Auction Rules" data={getAuctionDetails()} />,
        ];
        // getQuestionnaireDetails().map((item) => {
        //     return (
        //         questionnaireToRender.push(<OverviewItem title={item["Questionnaire Name"]} data={item} />)
        //     )
        // });
        return questionnaireToRender;
    };

    return (
        <Card title="Overview" className={"gx-card user-profile-gx-card input-form-border all-events-card"}
            style={{ minHeight: "97.5%" }}>
            <span className="gx-media-event-details">
                {/*<IntlMessages id=""/>*/} Below you can find the overview of the auction.
            </span>
            <div className={"user-profile-gx-media-card"} style={{ paddingTop: "16px" }} />
            <List className="gx-mb-4 list-orw"
                bordered
                dataSource={popOverviewToRender()}
                renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        </Card>
    );
}
export default Overview;