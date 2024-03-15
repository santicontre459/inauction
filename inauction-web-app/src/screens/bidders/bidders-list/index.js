import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Alert } from "antd";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import '../index.css'
import BiddersListTable from './components/bidders-table';
import { getBiddersInvitations } from "../../../redux/actions/bidderActions";
import IntlMessages from "../../../util/IntlMessages";
import * as Constants from "../../../constants/Constants";
import Can from '../../../components/RoleBasedAccessControl/Can';
import returnPermission from "../../../util/returnPermission";
import { Redirect } from "react-router-dom";

// retrieve customer from localstorage
const customer = JSON.parse(localStorage.getItem('jwtUser'));

class BiddersInvitations extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // retrieve bidders get action
  componentDidMount() {
    this.props.getBiddersInvitations();
  }

  render() {
    return (
      <Can
        role={returnPermission(customer)}
        perform="bidder:invitations"
        yes={() => (
          <Auxiliary>
            <Helmet>
              <title>iNauction Tool | {customer.subrole.description} | Your Bidders</title>
            </Helmet>
            <Breadcrumbs
              description = {<IntlMessages id="user.bidders.invitations.bidders_management" />}
              name = {<IntlMessages id="user.bidders.invitations.bidders_management.list" />}
            />
            <Alert className="module-informational-notes"
              message={<IntlMessages id="user.bidders.invitations.informational_notes.message" />}
              description={<IntlMessages id="user.bidders.invitations.informational_notes.description" />}
              type="info"
              showIcon
            />
            {/* {this.props.bidders.loading
              ? "Loading"
              : <BiddersListTable eventConstants={Constants} biddersInvitations={this.props.bidders.biddersInvitations } />
            } */}
            <BiddersListTable
              biddersInvitations={this.props.bidders.biddersInvitations}
              loading={this.props.bidders.loading}
            />
          </Auxiliary>
        )}
        no={() => <Redirect exact to={`/dashboard`}/>}
      />
    )
  }
}

const mapStateToProps = ({ bidders }) => {
  return { bidders }
};

export default connect(mapStateToProps, { getBiddersInvitations })(BiddersInvitations);
