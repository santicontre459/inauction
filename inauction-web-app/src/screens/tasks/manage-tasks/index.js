import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { connect } from "react-redux";
import { Col, Row, Card, Table, Button, Tag, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import '../index.css'
import IntlMessages from "../../../util/IntlMessages";
import StatusBasedTasksChart from "./components/statusBasedTasksChart";
import ScopeBasedTasksChart from "./components/scopeBasedTasksChart";
import { getTasksAll, deleteTask, getTaskExpert } from '../redux/tasksActions';
import { taskStatus, taskStatusLabelColor, taskNames } from "../taskConstants";
import moment from "moment";

const user = JSON.parse(localStorage.getItem('jwtUser'));
const pageSize = 10

class TasksList extends Component {
  constructor(props) {
    super(props);
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <>{taskNames[text]}</>,
      sorter: (a, b) => a.taskName.length - b.taskName.length,
    },
    {
      title: 'Expert',
      dataIndex: 'expert',
      key: 'expert',
      sorter: (a, b) => a.expert.length - b.expert.length,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      sorter: (a, b) => a.event.length - b.event.length,
    },
    {
      title: 'Task Status',
      dataIndex: 'status',
      key: 'status',
      render: text =>
        <div className="div-table-task-event-label">
          <Tag className="table-task-event-label" color={taskStatusLabelColor[text]}>
            {taskStatus[text]}
          </Tag>
        </div>,
      sorter: (a, b) => a.taskStatus.length - b.taskStatus.length,
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      render: text => <>{moment(text).format('MMMM D, YYYY')}</>,
      sorter: (a, b) => a.start.length - b.start.length,
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: text => <>{moment(text).format('MMMM D, YYYY')}</>,
      sorter: (a, b) => a.deadline.length - b.deadline.length,
    },
    {
      title: 'Manage',
      key: 'y',
      render: item => (
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={() => this.confirm(item)}
          onCancel={() => this.cancel()}
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
      render: item =>
        <span className="gx-link" onClick={() => this.onEditTask(item)}>
          Modify
        </span>
    },
  ];

  async componentDidMount() {
    await this.props.getTasksAll();
  }

  confirm = async item => {
    await this.props.deleteTask(item.id, user);
  }

  cancel = () => {
    console.log('canceled');
  }

  onEditTask = item => {
    this.props.history.push('/tasks/edit/' + item.id);
  }

  getTaskDataForTable = tasks => {
    if (tasks == null) return [];
    let tableData = [];
    tasks.map(task => {
      tableData.push({
        key: task.id,
        id: task.id,
        name: task.name.name,
        expert: task.expert.user.firstName,
        description: task.description,
        event: task.event?.title || '', // fill later
        status: task.compilationStatus,
        start: task.startDate,
        deadline: task.endDate,
      });
    });
    return tableData
  }

  render() {
    // const { experts } = this.props.experts;
    const { tasks, loading } = this.props.tasks;

    console.log('get tasks ,', tasks)
    const tasksTableData = this.getTaskDataForTable(tasks);

    // if (user.role.roleName === 'Host') {
    //   if (experts.length > 0 && tasks.length > 0) {
    //     experts.map(e => {
    //       tasks.map(t => {
    //         if(t.expert === e.user_details[0]._id){
    //           t.expertName = e.user_details[0].name + ' ' + e.user_details[0].surname
    //         }
    //       });
    //     });
    //   }
    // } else if (user.role.roleName === 'Host') {
    //   if(tasksExpert.length > 0 && experts.length > 0) {
    //     experts.map(e => {
    //       tasksExpert.map(t => {
    //         if(t.expert === e.user_details[0]._id) {
    //           t.expertName = e.user_details[0].name + ' ' + e.user_details[0].surname
    //         }
    //       });
    //     });
    //   }
    // }

    return (
      <Auxiliary>
        <Helmet>
          <title>iNauction Tool | {user.subrole.description} | Manage Tasks</title>
        </Helmet>
        <Breadcrumbs description={"Tasks Management"} name={"All Tasks"} />
        <Row gutter={[16, 0]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <StatusBasedTasksChart />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <ScopeBasedTasksChart />
          </Col>
          <Col span={24}>
            <Card className="gx-card expert-tasks-form-gx-card input-form-border" title="All Tasks">
              <span className="gx-media-input-form-details">
                <IntlMessages id="user.expert.task.all" />
              </span>
              <Button type="button" className="ant-btn add-expert-task-btn ant-btn-md" style={{ marginRight: "5px" }}>
                <Link to={"/tasks/create"}>
                  <i className="icon icon-add-circle" />
                  <span>Add Task</span>
                </Link>
              </Button>
              <Table
                className="gx-table-responsive expert-tasks-table-gx"
                size="small"
                columns={this.columns}
                dataSource={tasksTableData}
                // dataSource={
                //   user.type === 'HOST' ?
                //   (tasks.length > 0 ? tasks : []) :
                //   (tasksExpert.length > 0 ? tasksExpert : [])
                // }
                pagination={{ pageSize: pageSize }}
                bordered
                loading={loading}
              />
            </Card>
          </Col>
        </Row>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ experts, tasks }) => {
  return { experts, tasks }
};

export default connect(mapStateToProps, { getTasksAll, deleteTask, getTaskExpert })(TasksList);
