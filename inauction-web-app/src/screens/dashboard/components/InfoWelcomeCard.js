import React from "react";
import { BellOutlined, MailOutlined, MessageOutlined, ProfileOutlined } from '@ant-design/icons';
import './Index.css';
import IntlMessages from "../../../util/IntlMessages";

const InfoWelcomeCard = ({name}) => {

  return (
    <div className="gx-wel-ema gx-pt-xl-2 ">
      <h1 className="gx-mb-3"><IntlMessages id="user.dashboard.general.welcome" /> {name}!</h1>
      <p className="gx-fs-sm gx-text-uppercase"><IntlMessages id="user.dashboard.general.welcome.you_have" /></p>
      <ul className="gx-list-group">
        <li>
          <MessageOutlined className="dashboard-icon" />
          <span>5 <IntlMessages id="user.dashboard.general.unread_messages" /></span>
        </li>
        <li>
          <MailOutlined className="dashboard-icon" />
          <span>2 <IntlMessages id="user.dashboard.general.pending_bidders_invitations" /></span>
        </li>
        <li>
          <ProfileOutlined className="dashboard-icon" />
          <span>7 <IntlMessages id="user.dashboard.general.due_tasks" /></span>
        </li>
        <li>
          <BellOutlined className="dashboard-icon" />
          <span>3 <IntlMessages id="user.dashboard.general.other_notifications" /></span>
        </li>
        <li>
          <i className="icon icon-ckeditor dashboard-icon event-dashboard-icon"/>
          <span>2 <IntlMessages id="user.dashboard.general.active_events" /></span>
        </li>
      </ul>
    </div>
  );
};

export default InfoWelcomeCard;
