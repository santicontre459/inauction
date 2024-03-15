import React from "react";
import AmCharts from "@amcharts/amcharts3-react";
import { Card } from "antd";
import { ResponsiveContainer } from "recharts";
import IntlMessages from "../../../../util/IntlMessages";
import './Index.css';

const DonutChart = () => {

  const config = {
    "type": "pie",
    "theme": "light",
    "colors": ['#20ad8a', '#f7a35c', '#e74c3c'],
    "dataProvider": [
      {
        "title": "Completed",
        "value": 2852
      }, {
        "title": "Progress",
        "value": 2000
      }, {
        "title": "Not Completed",
        "value": 9899
      }
    ],
    "titleField": "title",
    "valueField": "value",
    "hideCredits":true,
    "labelRadius": 5,

    "radius": "42%",
    "innerRadius": "60%",
    "labelText": "[[title]]",
    "export": {
      "enabled": true
    }
  };

  return (
    <Card title="Status Based Tasks  - Chart" className={"gx-card tasks-chart-gx-card input-form-border"}>
      <span className="gx-media-tasks-chart">
        <IntlMessages id="user.events.tasks.chart.first.information"/>
      </span>
      <ResponsiveContainer  className="pie-chart-gx-media-container" height={300}>
          <AmCharts.React style={{width: "100%", height: "300px"}} options={config} className= "pie-chart-gx-media-card"/>
      </ResponsiveContainer>
    </Card>
  )
};

export default DonutChart;
