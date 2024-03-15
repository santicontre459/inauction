import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, Col, Row } from "antd";

const data = [{name: 'Active Experts', value: 50}, {name: 'Non Active Experts', value: 15}];
const COLORS = ['#5797fc', '#d9d9d9'];

const TotalExperts = () => {
    return (
        <Card className="gx-card expert-task-form-gx-card input-form-border"
              title={<span>Total Experts:<b style={{marginLeft: '20px'}}>{data[0].value + data[1].value}</b></span>}>
            <Row>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Tooltip/>
                            <text
                                x="50%" className="h1"
                                y="50%" textAnchor="middle" dominantBaseline="middle">
                                Experts
                            </text>
                            <Pie
                                data={data} dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={57}
                                outerRadius={67}
                                fill="#8884d8"
                            >
                                {
                                    data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <Row style={{marginTop:'10px'}}>
                <Col lg={8} md={8} sm={10} xs={10}>Last Logged Experts
                    <div>Experts|Active:</div>
                </Col>
                <Col lg={4} md={4} sm={14} xs={14}>
                    <div><b>{data[0].value}</b></div>
                </Col>
                <Col lg={8} md={8} sm={10} xs={10}>
                    <div>Experts|Non-Active:</div>
                </Col>
                <Col lg={4} md={4} sm={14} xs={14}>
                    <div><b>{data[1].value}</b></div>
                </Col>
            </Row>
        </Card>
    );
};

export default TotalExperts;
