import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {logoutUser} from "../../redux/actions/authActions";
import {Link} from "react-router-dom";

class UserInfo extends Component {

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
      <Popover
        overlayClassName="gx-popover-horizantal"
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click">
        <Avatar style={{backgroundColor: '#3f869c', verticalAlign: 'middle'}} size="large"
                className="gx-size-40 gx-pointer gx-mr-3" alt="">
          {this.props.authNew.user && this.props.authNew.user.firstName.charAt(0) + this.props.authNew.user.lastName.charAt(0)}
        </Avatar>
      </Popover>
    )

  }
}

const mapStateToProps = ({authNew}) => {
  return {authNew}
};
export default connect(mapStateToProps, {logoutUser})(UserInfo);
