import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "antd";
import '../Index.css';
import IntlMessages from "../../../util/IntlMessages";

const data = [
    {name: '1 Jan', 'Current Events':1, 'Closed Events':6, 'Declined Events':2, 'Won Events':5, 'Lost Events': 4},
    {name: '2 Jan', 'Current Events':3, 'Closed Events':4, 'Declined Events':2, 'Won Events':1, 'Lost Events': 4},
    {name: '3 Jan', 'Current Events':5, 'Closed Events':2, 'Declined Events':5, 'Won Events':6, 'Lost Events': 12},
    {name: '4 Jan', 'Current Events':6, 'Closed Events':1, 'Declined Events':11, 'Won Events':12, 'Lost Events': 6},
    {name: '5 Jan', 'Current Events':1, 'Closed Events':3, 'Declined Events':3, 'Won Events':5, 'Lost Events': 4},
    {name: '6 Jan', 'Current Events':3, 'Closed Events':12, 'Declined Events':2, 'Won Events':6, 'Lost Events': 5},
    {name: '7 Jan', 'Current Events':2, 'Closed Events':1, 'Declined Events':7, 'Won Events':2, 'Lost Events': 5},
    {name: '8 Jan', 'Current Events':5, 'Closed Events':4, 'Declined Events':7, 'Won Events':3, 'Lost Events': 7},
];

const AllEventsChart = () => (
    <Card className="gx-card user-profile-gx-card input-form-border" title={<IntlMessages id="user.analytics.all_events.chart" />}>
        <ResponsiveContainer  height={300}>
            <LineChart
                data={data}  style={{paddingTop:'10px'}}
                margin={{top: 10, right: 0, left: -15, bottom: 0}}
            >
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey='Current Events' stroke="#7CB5EC" />
                <Line type="monotone" dataKey='Closed Events' stroke="#434348" />
                <Line type="monotone" dataKey='Declined Events' stroke="#90ED7D" />
                <Line type="monotone" dataKey='Won Events' stroke="#F7A35C" />
                <Line type="monotone" dataKey='Lost Events' stroke="#8085e9" />
            </LineChart>
        </ResponsiveContainer>
    </Card>
);

export default AllEventsChart;
