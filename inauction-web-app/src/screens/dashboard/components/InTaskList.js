import React from "react";
import { Tabs } from "antd";
import Widget from "../../../components/Widget";
import TaskItem from "./TaskItem";
import { Link } from "react-router-dom";
import IntlMessages from "../../../util/IntlMessages";

const TabPane = Tabs.TabPane;

class InTaskList extends React.Component {
  onChange = (data, index) => {
    this.setState((prevState) => ({
      taskList: prevState.taskList.map(task => {
        if (task.id === data.id) {
          task.completed = !data.completed;
        }
        return task;
      })
    }))
  };

  constructor(props) {
    super(props);
    this.state = {taskList: props.taskList}
  }

  render() {
    return (
      <Widget title={<IntlMessages id="user.dashboard.task_list" />} styleName="gx-card-tabs"
              extra={<Link to={"/tasks/manage"}><i className="icon icon-search-new gx-pointer gx-fs-xxl gx-text-primary"/></Link>}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<IntlMessages id="user.dashboard.all_tasks" />}  key="1">
            {
              this.state.taskList.map((task, index) =>
                <TaskItem key={index} data={task} onChange={this.onChange}/>)
            }
          </TabPane>
          <TabPane tab={<IntlMessages id="user.dashboard.my_tasks" />}  key="2">{
            this.state.taskList.map((task, index) =>
              <TaskItem key={"2" + index} data={task} onChange={this.onChange}/>)
          }</TabPane>
        </Tabs>
      </Widget>
    );
  }
}


export default InTaskList;
