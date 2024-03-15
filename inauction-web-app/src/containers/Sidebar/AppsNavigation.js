import React from "react";
import { Badge } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AppsNavigation = (props) => {
    const unreadCnt = () => {
        return props.notifications.filter(n => n.read != true).length;
    }
    return (
        <ul className="gx-app-nav">
            <li>
                <Link className="in-customLink" to={"/events/create"}>
                    <i className="icon icon-ckeditor" />
                </Link>
            </li>
            <Badge count={unreadCnt()}>
                <li style={{paddingRight: 0}}>
                    <Link className="in-customLink" to={"/notifications"}>
                        <i className="icon icon-notification" />
                    </Link>
                </li>
            </Badge>
            <li>
                <Link className="in-customLink" to={"/chat/messages"}>
                    <i className="icon icon-chat-new" />
                </Link>
            </li>
            <li>
                <Link className="in-customLink" to={"/settings"}>
                    <i className="icon icon-components" />
                </Link>
            </li>
        </ul>
    )
};

const mapStateToProps = ({ auth, appNotifications }) => {
    const { notifications } = appNotifications;
    const { authUser } = auth;
    return { authUser, notifications }
};
export default connect(mapStateToProps)(AppsNavigation);
