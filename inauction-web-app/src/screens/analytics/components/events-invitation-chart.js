import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "antd";
import '../Index.css';
import IntlMessages from "../../../util/IntlMessages";

const data = [
    {name: '1 Jan', Accepted: 4, Declined: 6},
    {name: '2 Jan', Accepted: 3, Declined: 4},
    {name: '3 Jan', Accepted: 5, Declined: 2},
    {name: '4 Jan', Accepted: 6, Declined: 1},
    {name: '5 Jan', Accepted: 1, Declined: 3},
    {name: '6 Jan', Accepted: 1, Declined: 2},
    {name: '7 Jan', Accepted: 13, Declined: 1},
    {name: '8 Jan', Accepted: 5, Declined: 4},
];

const EventsInvitationChart = () => (
    <Card
        title={<IntlMessages id="user.analytics.event_invitations.chart"/>}
        className={"gx-card user-profile-gx-card input-form-border"}
    >
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                style={{paddingTop:'10px'}}
                margin={{top: 10, right: 0, left: -15, bottom: 0}}
            >
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="Accepted" stackId="a" fill="#3e869c"/>
                <Bar dataKey="Declined" stackId="a" fill="#e74c3c"/>
            </BarChart>
        </ResponsiveContainer>
    </Card>
);

export default EventsInvitationChart;
