import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Alert } from "antd";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import '../Index.css'
import EventsTable from "../components/eventsTable";
import { connect } from "react-redux";
import { getDraftEvents } from "../redux/eventActions";
import Can from "../../../components/RoleBasedAccessControl/Can";
import returnPermission from "../../../util/returnPermission";
import { Redirect } from "react-router-dom";

const customer = JSON.parse(localStorage.getItem('jwtUser'));

//class
class DraftEventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    await this.props.getDraftEvents();
  }

  render() {
    return (
      <Can
        role={returnPermission(this.props.authNew.user)}
        perform="event:draft"
        yes={() => (
          <Auxiliary>
            <Helmet>
              <title>iNauction Tool | {customer.subrole.description} | Events - Draft</title>
            </Helmet>
            <Breadcrumbs
              description={"Events - Draft Events"}
              name={"Draft"}
            />
            <Alert
              className="module-informational-notes"
              message="Informational Notes"
              description="Additional description about how the events works"
              type="info"
              showIcon
            />
            <EventsTable isDraft={true} loading={this.props.events.loading} eventsList={this.props.events.draftEventsList}/>
          </Auxiliary>
        )}
        no={() => <Redirect exact to={`/dashboard`}/>}
      />
    )
  }
}
const mapStateToProps = ({authNew, events}) => {
  return {authNew, events}
};

export default connect(mapStateToProps, {getDraftEvents})(DraftEventsList);
