import React from "react";
import {Avatar, Timeline} from "antd";
import WidgetHeader from "../../components/WidgetHeader/index";
import ActivityItem from "./ActivityItem";
import IntlMessages from "util/IntlMessages";

const TimeLineItem = Timeline.Item;

function getName(task, shape) {
  if (task.avatar === '') {
    let nameSplit = task.name.split(" ")
    if (task.name.split(" ").length === 1) {
      const initials = nameSplit[0].charAt(0).toUpperCase();
      return <Avatar shape={shape} className="gx-size-40 gx-bg-primary">{initials}</Avatar>
    } else {
      const initials = nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
      return <Avatar shape={shape} className="gx-size-40 gx-bg-cyan">{initials}</Avatar>
    }
  } else {
    return <Avatar shape={shape} className="gx-size-40" src={task.avatar}/>;
  }
}

class InRecentActivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      recentList: [],
      shape: '',
      limit: 3
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.setState({
      height: window.innerHeight + 'px',
      width: window.innerWidth + 'px',
      recentList: this.props.recentList,
      shape: this.props.shape
    });
    if (window.innerWidth < 575) {
      this.setState({limit: 1});
    }

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  onLoadMore() {
    this.setState((previousState) => ({
      limit: previousState.limit + 1,
    }));
  }


  render() {
    const {recentList, shape, limit} = this.state;
    return (
      <div className="gx-entry-sec recent-activities-dashboard">
        <WidgetHeader title={<IntlMessages id="user.dashboard.recent_activities" />} />
        {recentList.slice(0, limit).map((activity, index) =>
          <div className="gx-timeline-info" key={"activity" + index}>
            <h4 className="gx-timeline-info-day">{activity.day}</h4>
            <Timeline>
              {activity.tasks.map((task, index) => {

                return <TimeLineItem key={"timeline" + index} mode="alternate" dot={
                  getName(task, shape)
                }>
                  <ActivityItem task={task}/>
                </TimeLineItem>
              })}
            </Timeline>
          </div>)}
      </div>
    );
  }
}

export default InRecentActivity;
