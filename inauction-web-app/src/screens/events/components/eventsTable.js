import React from "react";
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import './index.css';
import moment from "moment";
import { formatCurrency, numberWithSpaces } from "../../../util/common";


const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    return obj;
};

const statusLabelColor = ['#108ee9', '#fa8c16', '#20ad8a', '#3f869c', '#ea5328', '#e74c3c', '#f7a35c', '#f7a35c', '#f7a35c', '#f7a35c', '#f7a35c']
const statusLabel = ['DRAFT', 'WAITING_REVIEW', 'READY_TO_PUBLISH', 'PUBLISHED', 'OPEN', 'COMPLETED', 'AWARDED', 'CANCELLED', 'DELETED'];

class EventsTable extends React.Component {
    state = {
        bordered: true,
        pagination: true,
        size: 'default',
        title: false,
        showHeader: true,
        footer: false,
        scroll: undefined,
        data: [],
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };
    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    componentDidMount() {
        let data = [];
        
        this.props && this.props.eventsList && this.props.eventsList.forEach((item, index) =>
            data.push({
                key: index,
                referenceNumber: item.referenceNumber,
                eventName: item.title,
                description: item.description,
                eventType: item.eventType == 0 ? 'RFQ' : item.eventType == 1 ? 'Online Auction' : 'Only Questionnaire',
                hasQuestionnaire: item.hasQuestionnaire ? 'Yes' : 'No',
                experts: item.expertsNumber,
                budget: item.defineBudget != true ? 'Not Defined' : formatCurrency(item.totalBudget, item.currency?.title, false),
                status: item.progressStatus,
                createdAt: moment(item.createdAt).format('LLLL'),
                updatedAt: moment(item.updatedAt).format('LLLL'),
            })
        );
        this.setState({ data: data })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.eventsList != this.props.eventsList) {
            console.log('this.props.eventsList ', this.props.eventsList)
            let data = [];
            this.props.eventsList.forEach((item, index) =>
                data.push({
                    key: index,
                    referenceNumber: item.referenceNumber,
                    eventName: item.title,
                    description: item.description,
                    eventType: item.eventType == 0 ? 'RFQ' : item.eventType == 1 ? 'Online Auction' : 'Only Questionnaire',
                    hasQuestionnaire: item.hasQuestionnaire ? 'Yes' : 'No',
                    experts: item.expertsNumber,
                    budget: item.defineBudget != true ? 'Not Defined' : formatCurrency(item.totalBudget, item.currency?.title, false),
                    status: item.progressStatus,
                    createdAt: moment(item.createdAt).format('LLLL'),
                    updatedAt: moment(item.updatedAt).format('LLLL'),
                })
            );
            this.setState({ data: data })
        }
    }


    render() {
        let { sortedInfo, filteredInfo, data } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const { loading, isDraft } = this.props;

        const columns = [
            {
                title: 'Reference Number',
                dataIndex: 'referenceNumber',
                // render: renderContent,
                key: 'referenceNumber',
                sorter: (a, b) => a.referenceNumber.localeCompare(b.referenceNumber),
                sortOrder: sortedInfo.columnKey === 'referenceNumber' && sortedInfo.order,
            }, {
                title: 'Name',
                dataIndex: 'eventName',
                render: renderContent,
                key: 'eventName',
                sorter: (a, b) => a.eventName.localeCompare(b.eventName),
                sortOrder: sortedInfo.columnKey === 'eventName' && sortedInfo.order,
            }, {
                title: 'Description',
                dataIndex: 'description',
                render: renderContent,
                key: 'description',
                sorter: (a, b) => a.description.localeCompare(b.description),
                sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
            }, {
                title: 'Type',
                dataIndex: 'eventType',
                render: renderContent,
                key: 'eventType',
                sorter: (a, b) => a.eventType.localeCompare(b.eventType),
                sortOrder: sortedInfo.columnKey === 'eventType' && sortedInfo.order,
                filters: [
                    { text: 'RFQ', value: 'RFQ' },
                    { text: 'Online Auction', value: 'Online Auction' },
                    { text: 'Only Questionnaire', value: 'Only Questionnaire' },
                ],
                filteredValue: filteredInfo.eventType || null,
                onFilter: (value, record) => record.eventType.includes(value),
            }, {
                title: 'Has Questionnaire',
                dataIndex: 'hasQuestionnaire',
                render: renderContent,
                key: 'hasQuestionnaire',
                sorter: (a, b) => a.hasQuestionnaire.localeCompare(b.hasQuestionnaire),
                sortOrder: sortedInfo.columnKey === 'hasQuestionnaire' && sortedInfo.order,
                filters: [
                    { text: 'Yes', value: 'Yes' },
                    { text: 'No', value: 'No' },
                ],
                filteredValue: filteredInfo.hasQuestionnaire || null,
                onFilter: (value, record) => record.hasQuestionnaire.includes(value),
            }, {
                title: 'Experts',
                dataIndex: 'experts',
                render: renderContent,
                key: 'experts',
                sorter: (a, b) => (a.experts > b.experts ? 1 : (a.experts == b.experts ? 0 : -1)),
                sortOrder: sortedInfo.columnKey === 'experts' && sortedInfo.order,
            }, {
                title: 'Budget',
                dataIndex: 'budget',
                render: renderContent,
                key: 'budget',
                sorter: (a, b) => (a.budget > b.budget ? 1 : (a.budget == b.budget ? 0 : -1)),
                sortOrder: sortedInfo.columnKey === 'budget' && sortedInfo.order,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: text => <div className="div-table-event-label">
                    <Tag className="table-event-label" color={statusLabelColor[text]}>
                        {statusLabel[text]}
                    </Tag>
                </div>,
                filters: (isDraft ?
                    [
                        { text: 'Draft', value: 0 },
                    ]
                    :
                    statusLabel.map((l, index) => ({ text: l, value: index })))
                ,
                filteredValue: filteredInfo.status || null,
                onFilter: (value, record) => record.status == value,
                sorter: (a, b) => a.status.length - b.status.length,
                sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,

            },
            {
                title: 'Created',
                dataIndex: 'createdAt',
                render: renderContent,
                key: 'createdAt',
                sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
                sortOrder: sortedInfo.columnKey === 'createdAt' && sortedInfo.order,
            },
            {
                title: 'Updated',
                dataIndex: 'updatedAt',
                render: renderContent,
                key: 'updatedAt',
                sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
                sortOrder: sortedInfo.columnKey === 'updatedAt' && sortedInfo.order,
            }
        ];
        return (
            <Card
                title="All Events List"
                className={"gx-card user-profile-gx-card input-form-border all-bidders-card"}
            >
                <span className="gx-media-bidders-details">
                    {/*<IntlMessages id=""/>*/} Below you can find all the events.
                </span>
                <Button
                    type="button"
                    className="ant-btn event-list-btn ant-btn-md"
                    style={{ marginRight: "5px" }}
                >
                    <Link to={"/events/create"}>
                        <i className="icon icon-add-circle" />
                        <span>Create Event</span>
                    </Link>
                </Button>
                {
                    isDraft ?
                        <Button type="button" className="ant-btn draft-events-btn ant-btn-md" style={{ marginRight: "5px" }}>
                            <Link to={"/events"}>
                                <i className="icon icon-filter-circle" />
                                <span>All Events</span>
                            </Link>
                        </Button>
                        :
                        <Button type="button" className="ant-btn all-events-btn ant-btn-md" style={{ marginRight: "5px" }}>
                            <Link to={"/events/draft"}>
                                <i className="icon icon-filter-circle" />
                                <span>Draft Events</span>
                            </Link>
                        </Button>
                }

                <Button type="button" className="ant-btn calendar-events-btn ant-btn-md" style={{ marginRight: "5px" }}>
                    <Link to={"/events/calendar"}>
                        <i className="icon icon-calendar" />
                        <span>Calendar</span>
                    </Link>
                </Button>
                <Button
                    type="button"
                    className="ant-btn table-action-btn ant-btn-md"
                    style={{ marginRight: "5px" }}
                    onClick={this.clearFilters}
                >
                    Clear filters
                </Button>
                <Button
                    type="button"
                    className="ant-btn table-action-btn ant-btn-md"
                    style={{ marginRight: "5px" }}
                    onClick={this.clearAll}
                >
                    Clear filters and sorters
                </Button>

                <Table
                    style={{ paddingTop: '10px' }}
                    className="gx-table-responsive events-table-gx-media-card"
                    columns={columns}
                    dataSource={data}
                    onChange={this.handleChange}
                    loading={loading}
                    {...this.state}
                />
            </Card>
        );
    }
}

export default EventsTable;
