import React, { Component } from "react";
import { connect } from "react-redux";
import Auxiliary from "../../../util/Auxiliary";
import { Col, Row, Card, Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import '../index.css'
import IntlMessages from "../../../util/IntlMessages";
import StatusBasedExpertsChart from "./components/statusBasedExpertsChart";
import TaskBasedExpertsChart from "./components/taskBasedExpertsChart";
import { getExperts, deleteExpert } from '../redux/expertsActions';
import moment from "moment";

class ExpertsList extends Component {
  constructor(props) {
    super(props);
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    }, {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      sorter: (a, b) => a.position.length - b.position.length,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: 'Last Accessed',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: text => <>{ text && moment(text).format('MMMM D, YYYY') }</>,
      sorter: (a, b) => a.lastAccessed.length - b.lastAccessed.length,
    },
    {
      title: 'Manage',
      key: 'y',
      render: (value, expert) => (
        <Popconfirm
          title="Are you sure delete this expert?"
          onConfirm={() => this.confirm(expert.id)}
          onCancel={()=> this.cancel()}
          okText="Yes"
          cancelText="No"
        >
          <span className="gx-link">Delete</span>
        </Popconfirm>
      )
    },
    {
      title: 'Modify',
      key: 'x',
      render: (value, expert) => (
        <span className="gx-link" onClick={() => this.onEditExpert(expert.id)}>
          Modify
        </span>
      )
    }
  ];

  confirm = expertId => {
    this.props.deleteExpert(expertId);
  };

  cancel = () => {
    console.log('canceled');
  };

  onEditExpert = expertId => {
    this.props.history.push('/experts/edit/' + expertId);
  };

  async componentDidMount() {
    await this.props.getExperts();
  }

  getExpertsDetails = experts => {
    let resultExperts = [];
    experts.forEach(item => {
      resultExperts.push({
        key: item.id,
        id: item.id,
        name: item.user.firstName,
        position: item.position,
        email: item.user.email,
        phoneNumber: item.user.phoneNumber,
        lastLogin: item.user.lastLogin,
      });
    });
    return resultExperts;
  }

  render() {
    const experts = this.getExpertsDetails(this.props.experts.experts);
    const { loading } = this.props.experts;

    return (
      <Auxiliary>
        <Helmet>
            <title>iNauction Tool |  | Manage Experts</title>
        </Helmet>
        <Breadcrumbs description = {"Experts Management"} name = {"All Experts"} />
        <Row gutter={[16, 0]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <StatusBasedExpertsChart/>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <TaskBasedExpertsChart/>
          </Col>
          <Col span={24}>
            <Card className="gx-card experts-form-gx-card input-form-border" title="All Experts">
              <span className="gx-media-input-form-details">
                <IntlMessages id="user.expert.experts.all"/>
              </span>
              <Button type="button" className="ant-btn add-expert-task-btn ant-btn-md" style={{marginRight:"5px"}}>
                <Link to={"/experts/create"}>
                  <i className="icon icon-add-circle"/>
                  <span>Add Expert</span>
                </Link>
              </Button>
              <Table
                className="gx-table-responsive experts-table-gx"
                size="small"
                columns={this.columns}
                dataSource={experts}
                pagination={{ pageSize: 10 }}
                loading={loading}
                bordered
              />
            </Card>
            </Col>
        </Row>
      </Auxiliary>
    )
  }
}

const mapStateToProps = ({ experts }) => {
    return { experts }
};

export default connect(mapStateToProps, { getExperts, deleteExpert })(ExpertsList);
