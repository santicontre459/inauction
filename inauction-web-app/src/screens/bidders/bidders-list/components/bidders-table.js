import React from "react";
import { Button, Card, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "../../../../util/IntlMessages";
import './Index.css';
import moment from "moment";

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  return obj;
};

const respondedLabelColor =['#20ad8a', '#f7a35c', '#e74c3c'];

class BiddersListTable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      bordered: true,
      pagination: true,
      size: 'default',
      title: false,
      showHeader: true,
      footer: false,
      scroll: undefined,
    }
  }

  // retrieve bidders from props
  getBidders(props) {
    if (props == null || props.biddersInvitations == null) return [];
    const data = [];
    props.biddersInvitations.forEach((item, index) =>
      data.push({
        key: index+1,
        company_name: item.company_name,
        email: item.email,
        company_registration_number: item.company_registration_number,
        //content: item.content,
        //type: item.type + '+' + item.scheduled_date + '+' + item.scheduled_timezone,
        responded_status:  item.responded_status,
        createdAt: moment(item.createdAt).format('LLLL')
      })
    );
    return data;
  }

  // render table with bidders
  render() {

    const { loading } = this.props;
    const data = this.getBidders(this.props);

    const columns = [
      {
        title: 'Nr.',
        dataIndex: 'key',
        render: renderContent,
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Company',
        dataIndex: 'company_name',
        render: renderContent,
        sorter: (a, b) => a.company_name.localeCompare(b.company_name),
      }, {
        title: 'Email',
        dataIndex: 'email',
        render: renderContent,
        sorter: (a, b) => a.email.localeCompare(b.email),
      }, {
        title: 'Company Registration Number',
        dataIndex: 'company_registration_number',
        render: renderContent,
        sorter: (a, b) => a.company_registration_number.localeCompare(b.company_registration_number),
      },
      // {
      //   title: 'Content',
      //   dataIndex: 'content',
      //   render: renderContent,
      //   sorter: (a, b) => a.content.localeCompare(b.content),
      // }, {
      //   title: 'Scheduled',
      //   dataIndex: 'type',
      //   className: "bidder-table-scheduled-row",
      //   render: text =>
      //   <ul>
      //     <li
      //       className={text.split("+")[0] === "IMMEDIATELY" ? "bidder-table-li-immediately" : "bidder-table-li-scheduled" }
      //     >
      //       <b>Type:</b> {text.split("+")[0]}
      //     </li>
      //     <li><b>Date:</b> {moment(text.split("+")[1]).format('LLLL')}</li>
      //     <li><b>Timezone:</b> {this.props.eventConstants.timeZones.filter(function(timezone) {
      //       return timezone.value === text.split("+")[2]
      //     })[0].title.split(" ")[0]}</li>
      //   </ul>,
      //   sorter: (a, b) => a.type.localeCompare(b.type),
      // },
      {
        title: 'Response',
        dataIndex: 'responded_status',
        render: text => <div className="div-table-bidder-label">
          <Tag className="table-bidder-label" color={respondedLabelColor[text]}>
            {text === 0 ? 'Not Responded': 'Accepted'}
          </Tag>
        </div>,
        sorter: (a, b) => a.responded_status.localeCompare(b.responded_status),
      }, {
        title: 'Created',
        dataIndex: 'createdAt',
        render: renderContent,
        sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      },
    ];

    return (
      <Card title={<IntlMessages id="user.bidders.invitations.list" />} className={"gx-card user-profile-gx-card input-form-border all-bidders-card"}>
        <span className="gx-media-bidders-details">
            <IntlMessages id="user.bidders.table.all.information"/>
        </span>
        <Button type="button" className="ant-btn bidders-list-btn ant-btn-md" style={{marginRight:"5px"}}>
          <Link to={"/bidders/invite"}>
            <i className="icon icon-navigation"/>
            <span>{<IntlMessages id="user.bidders.invitations.list.invite" />}</span>
          </Link>
        </Button>
        <Table
          className="gx-table-responsive bidder-invitations-table-gx-media-card"
          {...this.state}
          columns={columns}
          dataSource={data}
          loading={loading}
        />
      </Card>
    );
  }
}

export default BiddersListTable;
