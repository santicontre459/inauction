import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Col, Row, Select, Table, Tag, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { getActivities, getCompanyActivities, addCompanyActivity, deleteCompanyActivity } from "../../../redux/actions/ativityActions";
import { getFlattenActivities } from "../../../util/common";
import '../index.css'
import IntlMessages from "../../../util/IntlMessages";
import { connect } from "react-redux";
import { NotificationContainer, NotificationManager } from "react-notifications";
import CircularProgress from "../../../components/CircularProgress";

const customer = JSON.parse(localStorage.getItem('jwtUser'));

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  return obj;
};
const statusColor = {
  1: '#20ad8a',
  0: '#e74c3c',
};

//class
class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systemActivity: {
        systemActivityId: undefined,
      },
      pageSize: 10,
      y: 400
    }
  }

  componentDidMount() {
    console.log('customer  ', customer)
    this.props.getActivities();
    this.props.getCompanyActivities(customer.company.id);
  }

  onSystemActivityChange(event) {
    let systemActivity = Object.assign({}, this.state.systemActivity);
    systemActivity.systemActivityId = event;
    this.setState({ systemActivity: systemActivity });
  };

  onAddActivity = () => {
    this.props.addCompanyActivity(this.state.systemActivity.systemActivityId)
      .then(res => {
        this.props.getCompanyActivities(customer.company.id);
      })
      .catch(err => {
        NotificationManager.error("Ops", err.message);
        console.log(err)
      });
  }

  deleteCompanyActivity = activityId => {
    this.props.deleteCompanyActivity(activityId)
      .then(res => {
        this.props.getCompanyActivities(customer.company.id);
      })
      .catch(err => {
        NotificationManager.error("Ops", err.message);
        console.log(err.message)
      });
  };

  AddActivityHeader = () => {
    const Option = Select.Option;
    return (
      <div>
        {this.props.loading
          ? <CircularProgress className="gx-loader-400" />
          :
          <div className="gx-media gx-align-items-center gx-flex-nowrap">
            <div className="gx-media-body feedback-form-gx-media-body">
              <Select
                showSearch
                style={{ "width": "85%" }}
                placeholder="Select Activity"
                optionFilterProp="children"
                className="activities-add-gx-media-card"
                defaultValue={this.props.systemActivityId && this.props.systemActivityId}
                onChange={(e) => {
                  this.onSystemActivityChange(e);
                }}
                filterOption={
                  (input, option) => option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
                }
              >
                {
                  getFlattenActivities(this.props.allActivities).map(
                    (item, index) =>
                      <Option key={index} value={item.activity_id}>({item.activity_code}) - ({item.category_name}) - {item.activity_name}</Option>
                  )
                }
              </Select>
              <Button type="primary"
                disabled={!this.state.systemActivity.systemActivityId}
                className="ant-btn ant-btn-md btn-add-activity"
                style={{ marginTop: 15 }}
                onClick={() => {
                  this.onAddActivity()
                }}
              >
                <IntlMessages id="settings.activities.add_activity" />
              </Button>
            </div>

          </div>
        }

      </div>
    );
  };



  render() {
    const columns = [
      {
        title: 'Code',
        dataIndex: 'code',
        render: renderContent,
      }, {
        title: 'Activity',
        dataIndex: 'name',
        render: renderContent,
      }, {
        title: 'Status',
        dataIndex: 'status',
        render: text => <div className="div-table-event-label">
          <Tag className="table-event-label" color={statusColor[text]}>
            {text ? 'Active' : 'Inactive'}
          </Tag>
        </div>
      }, {
        title: 'Category',
        dataIndex: 'category_name',
        render: renderContent,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (value, data) => (
          <Popconfirm
            title="Are you sure delete this activity?"
            onConfirm={() => this.deleteCompanyActivity(data.id)}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <span className="gx-link">Delete</span>
          </Popconfirm>
        )
      }];

    return (
      <Auxiliary>
        <Helmet>
          <title>iNauction Tool | {customer.subrole.description} | Settings - Activities</title>
        </Helmet>

        <Breadcrumbs description={"Settings - Activities"} name={"Activities"} />

        <div className="gx-main-content">
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Card className="gx-card activity-form-gx-card input-form-border"
                style={{ "fontSize": "larger" }}
                title={"All Company Operating Activities"}>
                <span className="gx-media-input-form-details">
                  <span> (code) - (category) - (title)</span>
                </span>
                {this.AddActivityHeader()}
              </Card>
            </Col>
            <Col span={24}>
              <Card className="gx-card activity-form-gx-card input-form-border" title="All Activities">
                <span className="gx-media-input-form-details">
                  <span> List of all activities that your company is operating</span>
                </span>
                <Button type="button" className="ant-btn activities-list-btn ant-btn-md" style={{ marginRight: "5px" }}>
                  <Link to={"/settings/event_related_activities"}>
                    <i className="icon icon-navigation" />
                    <span>Event Related</span></Link>
                </Button>
                {this.props.loading
                  ? <CircularProgress className="gx-loader-400" />
                  :
                  <Table className="gx-table-responsive activities-table-gx-media-card"
                    size="small" columns={columns}
                    dataSource={this.props.company_activities}
                    pagination={{ pageSize: this.state.pageSize }}
                    scroll={{ y: this.state.y }} />
                }
              </Card>
            </Col>
          </Row>
        </div>
        <NotificationContainer />
      </Auxiliary>
    )
  }
}

const mapStateToProps = ({ activityReducer }) => {
  const allActivities = activityReducer.activities;
  const company_activities = activityReducer.company_activities;
  const loading = activityReducer.loading || false;
  return { loading, allActivities, company_activities }
};
export default connect(mapStateToProps, { getActivities, getCompanyActivities, addCompanyActivity, deleteCompanyActivity })(Activities);
