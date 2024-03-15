import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Alert } from "antd";
import { Helmet } from "react-helmet";
import EventsTable from "../components/eventsTable";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { connect } from "react-redux";
import { getEvents } from '../redux/eventActions';

const customer = JSON.parse(localStorage.getItem('jwtUser'));

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    await this.props.getEvents()
  }

  render() {
    return (
      <Auxiliary>
        <Helmet>
          <title>iNauction Tool | {customer.subrole.description} | Events - All</title>
        </Helmet>
        <Breadcrumbs
          description={"Events - List"}
          name={"All"}
        />
        <Alert
          className="module-informational-notes"
          message="Informational Notes"
          description="Additional description about how the events works"
          type="info"
          showIcon
        />
        <EventsTable isDraft={false} loading={this.props.events.loading} eventsList={this.props.events.eventsList} />
      </Auxiliary>
    )
  }
}

const mapStateToProps = ({ authNew, events }) => {
  return { authNew, events }
};

export default connect(mapStateToProps, { getEvents })(EventsList);
