import React from "react";
import NotificationItem from "./NotificationItem";
import {notifications} from "./data";
import CustomScrollbars from "util/CustomScrollbars";
import Auxiliary from "util/Auxiliary";
import {Button, Card} from "antd";
import {Link} from "react-router-dom";
import './index.css';

const AppNotification = () => {
    return (
        <Card className="gx-card user-profile-gx-card input-form-border" title={"Notifications"}>
            <span className="gx-media-input-form-details">
                 {/*<IntlMessages id="user.expert.experts.all"/>*/}Here you can find all your notifications!
            </span>
            <Button type="button" className="ant-btn mark-as-read-btn" style={{marginRight: "5px", marginBottom:"0px"}}>
                    <i className="icon icon-notification"/>
                    <span> Mark all as read</span>
            </Button>

            <CustomScrollbars className="user-profile-gx-media-card" style={{height: '280px'}}>
                <ul className="gx-sub-popover">
                    {notifications.map((notification, index) => <NotificationItem key={index}
                                                                                  notification={notification}/>)
                    }
                </ul>
            </CustomScrollbars>
        </Card>
    )
};

export default AppNotification;

