import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { logoutUser } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";

class UserProfile extends Component {

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>
          <Link className="in-customLink" to={"/account/profile"}>
            My Account
          </Link>
        </li>
        <li>
          <Link className="in-customLink" to={"/experts/all"}>
            My Experts
          </Link>
        </li>
        <li>
          <Link className="in-customLink" to={"/analytics"}>
            Analytics
          </Link>
        </li>
        <li onClick={() => this.props.logoutUser()}>
          Logout
        </li>
      </ul>
    );

    return (
      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <Popover
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
        >
          <Avatar
            style={{ backgroundColor: '#3f869c', verticalAlign: 'middle' }}
            size="large"
            className="gx-size-40 gx-pointer gx-mr-3"
            alt=""
          >
            {this.props.user.firstName.charAt(0) + this.props.user.lastName.charAt(0)}
          </Avatar>
          <span className="gx-avatar-name">
            {`${this.props.user.firstName} ${this.props.user.lastName}`}
            <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/>
          </span>
        </Popover>
      </div>
    )
  }
}

export default connect(null, {logoutUser})(UserProfile);
