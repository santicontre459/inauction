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
    "dataProvider": [
      {
        "title": "Kancelari Shitje Letrash",
        "value": 4852
      }, {
        "title": "Segmenti 4M Ndertimi",
        "value": 7899
      }, {
        "title": "Tender 4AM",
        "value": 1200
      }, {
        "title": "Blerje Hekuri",
        "value": 800
      }
    ],
    "titleField": "title",
    "valueField": "value",
    "labelRadius": 5,

    "radius": "42%",
    "innerRadius": "60%",
    "hideCredits":true,
    "labelText": "[[title]]",
    "export": {
      "enabled": true
    }
  };

  return (
    <Card title="Scope Based Tasks  - Chart" className={"gx-card tasks-chart-gx-card input-form-border"}>
      <span className="gx-media-tasks-chart">
        <IntlMessages id="user.events.tasks.chart.second.information"/>
      </span>
      <ResponsiveContainer  className="pie-chart-gx-media-container" height={300}>
        <AmCharts.React style={{width: "100%", height: "300px"}} options={config} className= "pie-chart-gx-media-card"/>
      </ResponsiveContainer>
    </Card>
  )
};

export default DonutChart;
