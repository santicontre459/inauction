import React from "react";
import { Button, Card, Table, Tag } from "antd";
import '../Index.css';
import IntlMessages from "../../../util/IntlMessages";
import { Link } from "react-router-dom";

const rawData = [
    {
        Identifier: '00zrxp6w',
        Name: '4AM - Ndertime Pallati',
        Description: 'TE',
        Type: 'Questionnaire',
        Currency: 'Euro',
        Questioner: 'Yes',
        Experts: 0,
        Budget: '',
        Status: 'Current',
        CreateAt: '2017-06-30 20:56:56',
        UpdatedAt: '2017-06-30 20:56:56',
        Deadline: 'December 19, 2017 10:25 GMT',
        Owner: 'Eglon Metalia SHPK SHPK',
    }, {
        Identifier: '01obhha',
        Name: 'Shitje Letrash dhe Produkte Kancelarie',
        Description: '',
        Type: 'Request For Quotation (RFQ)',
        Currency: 'British Pound',
        Questioner: 'Yes',
        Experts: 0,
        Budget: '',
        Status: 'Draft',
        CreateAt: '2017-06-24 15:09:34',
        UpdatedAt: '2017-06-24 15:09:34',
        Deadline: 'December 19, 2017 10:25 GMT',
        Owner: 'Eglon Metalia SHPK SHPK',
    }, {
        Identifier: '01oh3',
        Name: 'Ndertim Kontenier per Serverat',
        Description: 'test',
        Type: 'Questionnaire + Online Auction',
        Currency: 'Albanian Lek',
        Questioner: 'Yes',
        Experts: 1,
        Budget: '',
        Status: 'Completed',
        CreateAt: '2017-07-02 21:49:19',
        UpdatedAt: '2017-07-02 21:49:19',
        Deadline: 'December 19, 2017 10:25 GMT',
        Owner: 'Eglon Metalia SHPK SHPK',
    },
    {
        Identifier: '01oh3',
        Name: 'Segmenti Rrugor Mekat Llakatund',
        Description: 'test',
        Type: 'Questionnaire',
        Currency: 'Albanian Lek',
        Questioner: 'Yes',
        Experts: 1,
        Budget: '',
        Status: 'Closed',
        CreateAt: '2017-07-02 21:49:19',
        UpdatedAt: '2017-07-02 21:49:19',
        Deadline: 'December 19, 2017 10:25 GMT',
        Owner: 'Eglon Metalia SHPK SHPK',
    },
    {
        Identifier: '01oh3',
        Name: '4AM - Ndertime Segmenti',
        Description: 'test',
        Type: 'Questionnaire + Qual. Bids',
        Currency: 'Albanian Lek',
        Questioner: 'Yes',
        Experts: 1,
        Budget: '',
        Status: 'Awarded',
        CreateAt: '2017-07-02 21:49:19',
        UpdatedAt: '2017-07-02 21:49:19',
        Deadline: 'December 19, 2017 10:25 GMT',
        Owner: 'Eglon Metalia SHPK SHPK',
    },
];

const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    return obj;
};

const labelColor = {
    Current: '#108ee9',
    Draft:'#fa8c16',
    Completed: '#20ad8a',
    Awarded: '#3f869c',
    Closed: '#ea5328',
    Declined: '#e74c3c',
    Lost: '#f7a35c',
};

const columns = [
    {
    title: 'Identifier',
    dataIndex: 'Identifier',
    render: renderContent,
    }, {
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
    }, {
    title: 'Status',
    dataIndex: 'Status',
    render: text => <div className="div-table-event-status"><Tag className="table-event-status" color={labelColor[text]}>{text}</Tag></div>,
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

const AllEvent = () => {
    return (
        <Card
            title={<IntlMessages id="user.analytics.all_events.all"/>}
            className={"gx-card user-profile-gx-card input-form-border all-events-card"}
        >
             <span className="gx-media-event-details">
                <IntlMessages id="user.events.table.list.information"/>
             </span>
            <Button type="button" className="ant-btn events-list-btn ant-btn-md" style={{marginRight:"5px"}}>
                <Link to={"/events"}>
                    <i className="icon icon-ckeditor"/>
                    <span><IntlMessages id="user.analytics.all_events.list"/></span>
                </Link>
            </Button>
            <Table
                className="gx-table-responsive events-table-gx-media-card"
                columns={columns}
                dataSource={data}
                bordered
            />
        </Card>
    );
}

export default AllEvent;
