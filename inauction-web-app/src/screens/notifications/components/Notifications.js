import React from "react";
import NotificationItem from "./NotificationItem";
import { connect } from "react-redux";
import CustomScrollbars from "../../../util/CustomScrollbars";
import { Button, Card } from "antd";
import { markReadNotification, getAppNotifications } from "../../../redux/actions/appNotificationsActions";
import './index.css';
import {AppNotificationType} from '../../../constants/Constants';

const AppNotification = (props) => {
    const unreadCnt = () => {
        return props.notifications.filter(n => n.read != true).length;
    }

    const markReadAll = () => {
        props.markReadNotification()
            .then((res) => {
                props.getAppNotifications();
            })
            .catch(err => {});
    }

    const onClickItem=(notification)=>{
        if(notification.notification_type == AppNotificationType.INVITATION_EVENT && notification.data_id != null) {
            props.markReadNotification(notification.id)
            .then((res) => {
                props.history.push(`/auction/${notification.data_id}`);
                props.getAppNotifications();
            })
            .catch(err => {});            
        }
    }

    return (
        <Card className="gx-card user-profile-gx-card input-form-border" title={"Notifications"}>
            <span className="gx-media-input-form-details">
                {/*<IntlMessages id="user.expert.experts.all"/>*/}Here you can find all your notifications!
            </span>
            <Button disabled={unreadCnt() == 0} type="button" className="ant-btn mark-as-read-btn" onClick={markReadAll} style={{ marginRight: "5px", marginBottom: "0px" }}>
                <i className="icon icon-notification" />
                <span> Mark all as read</span>
            </Button>

            <CustomScrollbars className="user-profile-gx-media-card" style={{ height: '500px' }}>
                <ul className="gx-sub-popover">
                    {props.notifications.map((notification, index) =>
                        <NotificationItem key={index}
                            notification={notification}
                            onClick={() => {
                                onClickItem(notification);
                            }}
                        />)
                    }
                </ul>
            </CustomScrollbars>
        </Card>
    )
};


const mapStateToProps = ({ auth, appNotifications }) => {
    const { notifications } = appNotifications;
    const { authUser } = auth;
    return { authUser, notifications }
};
export default connect(mapStateToProps, { markReadNotification, getAppNotifications })(AppNotification);
