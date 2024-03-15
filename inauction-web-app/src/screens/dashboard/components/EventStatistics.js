import React from "react";
import IntlMessages from "../../../util/IntlMessages";
import LineIndicator from "./LineIndicator";

const EventStatistics = () => {
  return (
    <div className="gx-site-dash gx-mb-2 gx-pt-3 gx-pt-sm-0 gx-pt-xl-2">
      <h3 className="gx-mb-3">
        <IntlMessages id="user.dashboard.event_statistics" />
      </h3>
      <ul className="gx-line-indicator gx-line-indicator-dashboard">
        <li>
          <LineIndicator width="56%" title={()=><IntlMessages id="user.dashboard.event_statistics.current" />} color="#108ee9" value="40%"/>
        </li>
        <li>
          <LineIndicator width="42%" title={()=><IntlMessages id="user.dashboard.event_statistics.draft" />} color="#fa8c16" value="30%"/>
        </li>
        <li>
          <LineIndicator width="20%" title={()=><IntlMessages id="user.dashboard.event_statistics.completed" />} color="#20ad8a" value="15%"/>
        </li>
        <li>
          <LineIndicator width="20%" title={()=><IntlMessages id="user.dashboard.event_statistics.awarded" />} color="#3f869c" value="13%"/>
        </li>
        <li>
          <LineIndicator width="20%" title={()=><IntlMessages id="user.dashboard.event_statistics.closed" />} color="#ea5328" value="12%"/>
        </li>
      </ul>
    </div>
  )
};
export default EventStatistics;
