import React from "react";
import { Avatar } from "antd";
import moment from "moment";
import Img_invitation from '../../../assets/images/icons/invitation.png'

const NotificationItem = ({ notification, onClick }) => {
  const { title, message, createdAt, read } = notification;
  return (
    <li className="gx-media" onClick={onClick} style={{ cursor: 'pointer', marginTop: 2, backgroundColor: read ? '#fff' : '#d7f4fa' }}>
      <Avatar className="gx-size-40 gx-mr-3" style={{ padding: 6 }} src={Img_invitation} />
      <div className="gx-media-body gx-align-self-center">
        <p className="gx-fs-sm gx-mb-0">{message}</p>
        <span className="gx-meta-date"><small>{moment(createdAt).format('DD/MM/YYYY hh:mm A')}</small></span>
      </div>
    </li>
  );
};

export default NotificationItem;
