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
        "title": "Eglon Metalia",
        "value": 5
      }, {
        "title": "Eglon Metalia",
        "value": 3
      }, {
        "title": "Bojken Shefi",
        "value": 10
      }, {
        "title": "Andi Bosi",
        "value": 1
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
    <Card title="Task Based Experts  - Chart" className={"gx-card experts-chart-gx-card input-form-border"}>
      <span className="gx-media-experts-chart">
        <IntlMessages id="user.events.experts.chart.second.information"/>
      </span>
      <ResponsiveContainer  className="pie-chart-gx-media-container" height={300}>
        <AmCharts.React style={{width: "100%", height: "300px"}} options={config} className= "pie-chart-gx-media-card"/>
      </ResponsiveContainer>
    </Card>
  )
};

export default DonutChart;
