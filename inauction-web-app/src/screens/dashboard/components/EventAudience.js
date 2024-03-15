import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { eventAudience } from "../data";
import IntlMessages from "../../../util/IntlMessages";

const EventAudience = () => (
  <div className="gx-site-dash gx-pr-xl-5 gx-pt-3 gx-pt-xl-0 gx-pt-xl-2">
    <h3 className="gx-mb-3">
      <IntlMessages id="user.dashboard.audience" />
    </h3>
    <ResponsiveContainer width="100%" height={140}>
      <AreaChart data={eventAudience}
                 margin={{top: 10, right: 0, left: -20, bottom: 0}}>
        <Tooltip/>
        <CartesianGrid horizontal={false} strokeDasharray="3 3"/>
        <Area type='monotone' dataKey='thisYear' fillOpacity={1} stroke='#3f869c' fill='#3f869c'/>
        <Area type='monotone' dataKey='lastYear' fillOpacity={1} stroke='#FE9E15' fill='#FE9E15'/>
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default EventAudience;

