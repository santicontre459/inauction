import React from "react";
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Table } from "antd";
import { Link } from "react-router-dom";
import '../Index.css';
import IntlMessages from "../../../util/IntlMessages";

const rawData = [
    {
        Identifier: 'AL-234DE',
        Name: 'Kancelari - Blerje Letrash',
        Owner: 'Eglon Metalia SHPK SHPK',
        Type: 'Questionnaire + Qual. Bids + Auction',
        Deadline: 'December 19, 2017 10:25 GMT',
    }, {
        Identifier: 'VA-234DD',
        Name: '4AM - Ndertime Stadium',
        Owner: 'Eglon Metalia SHPK SHPK',
        Type: 'Questionnaire + Qual. Bids + Auction',
        Deadline: 'December 29, 2017 10:25 GMT',
    },{
        Identifier: 'RR-334M',
        Name: '4AM - Ndertime Segmenti',
        Owner: 'Eglon Metalia SHPK SHPK',
        Type: 'Questionnaire + Qual. Bids + Auction',
        Deadline: 'December 29, 2017 10:25 GMT',
    },
];

const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    return obj;
};

const columns = [
    {
    title: 'Identifier',
    dataIndex: 'Identifier',
    render: renderContent,
    },{
    title: 'Name',
    dataIndex: 'Name',
    render: renderContent,
    }, {
    title: 'Owner',
    dataIndex: 'Owner',
    render: renderContent,
    }, {
    title: 'Type',
    dataIndex: 'Type',
    render: renderContent,
    }, {
    title: 'Deadline',
    dataIndex: 'Deadline',
    render: renderContent,
}];

const data = [];
rawData.forEach(myFunction);

function myFunction(item, index) {
    data.push({
        key: index,
        Identifier: item.Identifier,
        Name: item.Name,
        Owner: item.Owner,
        Type: item.Type,
        Deadline: item.Deadline,
        Status: item.Status,
    })
}

const CurrentEvent = () => {

    const tableProps = {
        bordered: true,
        loading: false,
        pagination: true,
        size: 'default',
        title: false,
        showHeader: true,
        footer:false,
        scroll: undefined,
    };

    return (
        <Card
            title={<IntlMessages id="user.analytics.currents_events.current"/>}
            className={"gx-card user-profile-gx-card input-form-border all-events-card"}
        >
            <span className="gx-media-event-details">
                <IntlMessages id="user.events.table.currents.information"/>
            </span>
            <Button
                type="button"
                className="ant-btn events-list-btn ant-btn-md"
                style={{marginRight:"5px"}}
            >
                <Link to={"/events/all"}>
                    <i className="icon icon-ckeditor"/>
                    <span><IntlMessages id="user.analytics.currents_events.list"/></span>
                </Link>
            </Button>
            <Table
                className="gx-table-responsive events-table-gx-media-card"
                {...tableProps}
                columns={columns}
                dataSource={data}
            />
        </Card>
    );
}

export default CurrentEvent;
