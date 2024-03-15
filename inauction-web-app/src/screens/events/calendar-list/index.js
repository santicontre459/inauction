import React, { Component } from "react";
import { connect } from "react-redux";
import Auxiliary from "../../../util/Auxiliary";
import { Card, Alert } from "antd";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import '../Index.css'
import BigCalendar from "react-big-calendar";
import moment from "moment";
import events from "../events";
import { getEvents } from '../redux/eventActions';
import { eventTypes } from "../create-event/Constants";
import EventDetailsModal from "../../../components/Modal/EventDetails";

const customer = JSON.parse(localStorage.getItem('jwtUser'));

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

//class
class CalendarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: null,
      showEventDetails: false,
      selectedEvent: null,
      events: []
    }
  }

  componentDidMount() {
    this.setState({ currentDate: new Date() })
    this.props.getEvents();
    this.loadEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.eventsList != this.props.eventsList) {
      this.loadEvents();
    }
  }

  loadEvents = () => {
    let events = [];
    this.props.eventsList.forEach(event => {
      let tmpEvent = {
        title: event.title,
        resource: event
      }

      let start = null;
      if (event.eventType == eventTypes.RFQ && event.rfqs && event.rfqs.length > 0) {
        start = new Date(event.rfqs[0].bidDeadline);
      }
      else if (event.eventType == eventTypes.OA && event.onlineAuctions && event.onlineAuctions.length > 0) {
        start = new Date(event.onlineAuctions[0].startTime);
      }
      else if (event.eventType == eventTypes.NONE && event.questionNaires && event.questionNaires.length > 0) {
        start = new Date(event.questionNaires[0].deadline);
      }

      if (start) {
        tmpEvent.start = start;
        tmpEvent.end = start;
      }
      events.push(tmpEvent);
    });
    this.setState({ events: events })
  }

  render() {

    return (
      <Auxiliary>
        <Helmet>
          <title>iNauction Tool | {customer.subrole.description} | Events - Calendar</title>
        </Helmet>
        <Breadcrumbs description={"Events - Calendar"} name={"Calendar"} />
        <Alert className="module-informational-notes"
          message="Informational Notes"
          description="All the events are listed at the calendar. You can filter them by day, by month. Also,
                            you can check events details on each day"
          type="info"
          showIcon
        />
        <div className="gx-main-content">
          <div className="gx-rbc-calendar">
            <Card className="gx-card input-form-border gx-calendar-card" >
              <BigCalendar
                selectable
                events={this.state.events}
                defaultView='month'
                scrollToTime={new Date()}
                defaultDate={new Date()}
                onSelectEvent={event => {
                  this.setState({ showEventDetails: true, selectedEvent: event });
                }}
                onSelectSlot={(slotInfo) => {
                  // alert(
                  //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                  //   `\nend: ${slotInfo.end.toLocaleString()}` +
                  //   `\naction: ${slotInfo.action}`
                  // )
                }}
              />
            </Card>
          </div>
        </div>
        <EventDetailsModal
          showModal={this.state.showEventDetails}
          data={this.state.selectedEvent}
          onClose={() => this.setState({ showEventDetails: false })}
        />
      </Auxiliary>
    )
  }
}

const mapStateToProps = ({ authNew, events }) => {
  const { eventsList } = events;
  return { authNew, eventsList }
};

export default connect(mapStateToProps, { getEvents })(CalendarList);