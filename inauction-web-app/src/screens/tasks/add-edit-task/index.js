import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Card, Form, Input, Button, Select, DatePicker, Col, Row } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import '../../../styles/style.css';
import '../index.css'
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { Helmet } from "react-helmet";
import { getExperts } from '../../experts/redux/expertsActions';
import { getDraftEvents } from "../../events/redux/eventActions";
import { getTask, addTask, updateTask, getTaskNames } from '../redux/tasksActions';
import { NotificationContainer, NotificationManager } from "react-notifications";
import moment from "moment";
import { taskNames, taskTypes } from "../taskConstants";

const Option = Select.Option;
const user = JSON.parse(localStorage.getItem('jwtUser'));

const tailLayout = {
  wrapperCol: {
    span: 24,
    align: 'right',
  },
};

class CreateTask extends Component {

  formRef = React.createRef();

  constructor() {
    super();
    this.state = {
      taskTypeList: [],
      editPage: false,
    };
  }

  async componentDidMount() {
    await this.props.getExperts();
    await this.props.getTaskNames();
    await this.props.getDraftEvents();
    if (this.props.match.params.id) {
      this.setState({ editPage: true });
      await this.props.getTask(this.props.match.params.id);
      this.changeTaskTypesList(this.props.tasks.task.name.id);
      this.fillFieldsForEdit();
    }
  }

  fillFieldsForEdit = () => {
    const { task } = this.props.tasks;
    this.formRef.current.setFieldsValue({
      name: task.name.id,
      type: task.type.id,
      description: task.description,
      expert: task.expert.id,
      event : task.event?.id,
      start_date: moment(task.startDate),
      end_date: moment(task.endDate),
    });
  }

  onFinish = async values => {
    console.log('add task ', values)
    values.user_id = user.id;
    values.company_id = user.company.id;
    let result = '';
    if (this.state.editPage) result = await this.props.updateTask(this.props.match.params.id, values, user);
    else result = await this.props.addTask(values);
    if (result === 'success') this.onSuccess();
    else this.onError();
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

  onNameChange = value => {
    this.changeTaskTypesList(value);
    this.formRef.current.setFieldsValue({ type: undefined });
  }

  changeTaskTypesList = taskNameId => {
    const { tasks_names } = this.props.tasks;
    const selectedName = tasks_names?.find(task_name => task_name.id === taskNameId);
    const taskTypeList = selectedName.types;
    this.setState({ taskTypeList: taskTypeList });
  }

  onSuccess = () => {
    const subMessage = this.state.editPage ? 'updated' : 'created';
    NotificationManager.success(`Task has been ${subMessage} successfully`, 'success', 1500);
    setTimeout(() => { this.props.history.push('/tasks/manage') }, 1500);
  }

  onError = () => {
    NotificationManager.error(this.props.errors, 'failed', 3000);
  }

  render() {
    const { experts } = this.props.experts;
    const { tasks_names } = this.props.tasks;
    const {draftEventsList} = this.props.events;

    return (
      <Auxiliary>
        <Helmet>
          <title>iNauction Tool | {user.subrole.description} | {(this.state.editPage) ? 'Update Task' : "Add Task"}</title>
        </Helmet>
        <Breadcrumbs description={"Tasks Management"} name={(this.state.editPage) ? 'Update Task' : "Add New Task"} />
        <div className="gx-main-content">
          <Row>
            <Col xl={3} lg={3} md={24} sm={24} xs={24} />
            <Col xl={18} lg={18} md={24} sm={24} xs={24} style={{ "display": "inline-block" }}>
              <Card className="gx-card add-task-form-gx-card input-form-border" title={"Tasks Management"}>
                <span className="gx-media-input-form-details">
                  <IntlMessages id="user.expert.task.block_description" />
                </span>
                <Form
                  name="add_task"
                  ref={this.formRef}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                  layout="vertical"
                >
                  <Form.Item
                    name="name"
                    label={<IntlMessages id="user.expert.task.name" />}
                    rules={[{ required: true, message: 'Type is required!' }]}
                  >
                    <Select
                      placeholder="Select a name"
                      onChange={this.onNameChange}
                      getPopupContainer={trigger => trigger.parentNode}
                    >
                      {tasks_names && tasks_names.map((task_name, index) => (
                        <Option key={index.toString()} value={task_name.id}>
                          {taskNames[task_name?.name]}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="type"
                    label={<IntlMessages id="user.expert.task.type" />}
                    rules={[{ required: true, message: 'Name is required!' }]}
                  >
                    <Select
                      placeholder="Select a type"
                      getPopupContainer={trigger => trigger.parentNode}
                    >
                      {this.state.taskTypeList && this.state.taskTypeList.map((task_type, index) => (
                        <Option key={index.toString()} value={task_type.id}>
                          {taskTypes[task_type?.name]}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label={<IntlMessages id="user.expert.task.description" />}
                    rules={[{ required: true, message: 'Description is required!' }]}
                  >
                    <Input placeholder='Enter description' />
                  </Form.Item>
                  <Form.Item
                    name="expert"
                    label={<IntlMessages id="user.expert.task.expert" />}
                    rules={[{ required: true, message: 'Expert is required!' }]}
                  >
                    <Select
                      showSearch
                      placeholder="Select an expert"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      getPopupContainer={trigger => trigger.parentNode}
                    >
                      {experts.length > 0 ?
                        experts.map(expert => (
                          <Option key={expert.id} value={expert.id}>
                            {expert.user.firstName + ' ' + expert.user.lastName}
                          </Option>
                        ))
                        :
                        <Option key="no_expert" value={""}>You do not have an expert added yet.</Option>
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="event"
                    label={<IntlMessages id="user.expert.task.event" />}
                  >
                    <Select
                      showSearch
                      placeholder="Select an event"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {draftEventsList.length > 0 ?
                        draftEventsList.map(event => (
                          <Option key={event.id} value={event.id}>
                            {event.title}
                          </Option>
                        ))
                        :
                        <Option key="no_event" value={""}>There are not any active events yet.</Option>
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="start_date"
                    label={<IntlMessages id="user.expert.task.start_date" />}
                    rules={[{ required: true, message: 'Start date is required!' }]}
                  >
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      style={{ display: 'block' }}
                      placeholder={'Select start date'}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  </Form.Item>
                  <Form.Item
                    name="end_date"
                    label={<IntlMessages id="user.expert.task.end_date" />}
                    rules={[{ required: true, message: 'End date is required!' }]}
                  >
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      style={{ display: 'block' }}
                      placeholder={'Select end date'}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="button" className="ant-btn back-to-btn ant-btn-md" style={{ marginRight: 10 }}>
                      <Link to={"/tasks/manage"}><span>Back to tasks</span></Link>
                    </Button>

                    <Button type="primary" htmlType="submit" className="ant-btn ant-btn-md" style={{ marginRight: 0 }}>
                      <span>{(this.state.editPage) ? 'Update task' : "Add task"}</span>
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col xl={3} lg={3} md={24} sm={24} xs={24} />
          </Row>
        </div>
        <NotificationContainer />
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ errors, tasks, experts, events }) => {
  return { errors, tasks, experts, events };
};

export default connect(mapStateToProps, { getExperts, getTaskNames, getTask, addTask, updateTask, getDraftEvents })(CreateTask);
