import React from "react";
import { Modal, Tabs } from 'antd';
import AmCharts from "@amcharts/amcharts3-react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TabPane = Tabs.TabPane;

const configs = {
    participantProgression: {
        "theme": "light",
        "type": "serial",
        "legend": {
            "useGraphSettings": true,
            "markerSize": 12,
            "valueWidth": 0,
            "verticalGap": 0
        },
        "dataProvider": [{
            participant: "Test 1",
            startingBid: 10.5,
            latestBid: 10.2,
            currentBid: 11.3,
        }, {
            participant: "Test 2",
            startingBid: 10.8,
            latestBid: 10.3,
            currentBid: 11.3,
        }, {
            participant: "Test 3",
            startingBid: 11.2,
            latestBid: 10.5,
            currentBid: 11.3,
        }],
        "valueAxes": [{
            "stackType": "3d",
            "position": "left",
            "title": "Bid Value",
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "Latest Bid: <b>[[value]]</b>",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "title": "Latest Bid",
            "type": "column",
            "valueField": "latestBid"
        }, {
            "balloonText": "Starting Bid: <b>[[value]]</b>",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "title": "Starting Bid",
            "type": "column",
            "valueField": "startingBid"
        }, {
            "balloonText": "Current Bid: <b>[[value]]</b>",
            "bullet": "round",
            "lineThickness": 3,
            "bulletSize": 7,
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "useLineColorForBulletBorder": true,
            "bulletBorderThickness": 3,
            "fillAlphas": 0,
            "lineAlpha": 1,
            "title": "Current Bid",
            "valueField": "currentBid",
            "dashLengthField": "dashLengthLine"
        }
        ],
        "plotAreaFillAlphas": 0.1,
        "depth3D": 60,
        "angle": 30,
        "categoryField": "participant",
        "categoryAxis": {
            "gridPosition": "start"
        },
        "export": {
            "enabled": true
        }
    },
    allBidProgression: [
        {time: '10:40 AM', 'Test 1': 10.08, 'Test 2': 10.7, 'Test 3': 11.2, 'Current Value': 11.3},
        {time: '10:50 AM', 'Test 1': 10.06, 'Test 2': 10.2, 'Test 3': 10.8, 'Current Value': 11.3},
    ],
    bestBidProgression: [
        {time: '10:40 AM', 'Test 1': 10.08, 'Test 2': 10.7, 'Test 3': 11.2, 'Current Value': 11.3},
        {time: '10:50 AM', 'Test 1': 10.06, 'Test 2': 10.2, 'Test 3': 10.8, 'Current Value': 11.3},
    ],
    savingsProgression: [
        {time: '10:40 AM', 'Test 1': 10.08, 'Test 2': 10.7, 'Test 3': 11.2, 'Current Value': 11.3},
        {time: '10:50 AM', 'Test 1': 10.06, 'Test 2': 10.2, 'Test 3': 10.8, 'Current Value': 11.3},
    ],
};

class HostGraphModal extends React.Component {
    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    render() {
        return (
            <div>
                <Modal
                    title={"Current Bids: " + this.props.eventName}
                    visible={this.props.visibility}
                    onOk={this.props.onOk}
                    onCancel={this.props.onOk}
                    cancelButtonProps={{style: {display: 'none'}}}
                    centered={true}
                >
                    <Tabs onChange={this.callback} type="card" tabBarExtraContent={this.state.operations}>
                        <TabPane tab="Participant Progression" key="1">
                            <AmCharts.React style={{width: "100%", height: "400px"}}
                                            options={configs.participantProgression}/>
                        </TabPane>
                        <TabPane tab="All Bid Progression" key="2">
                            <div style={{marginBottom: "10px"}}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={configs.allBidProgression}
                                               margin={{top: 10, right: 0, left: -15, bottom: 0}}>
                                        <XAxis dataKey="time" padding={{left: 30, right: 30}}/>
                                        <YAxis/>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Tooltip/>
                                        <Legend style={{paddingBottom: "10px"}}/>
                                        <Line type="monotone" dataKey="Test 1" stroke="#7CB5EC" activeDot={{r: 8}}/>
                                        <Line type="monotone" dataKey="Test 2" stroke="#434348"/>
                                        <Line type="monotone" dataKey="Test 3" stroke="#90EC7D"/>
                                        <Line type="monotone" dataKey="Current Value" stroke="#F8B883"/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </TabPane>
                        <TabPane tab="Best Bid Progression" key="3">
                            <div style={{marginBottom: "10px"}}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={configs.bestBidProgression}
                                               margin={{top: 10, right: 0, left: -15, bottom: 0}}>
                                        <XAxis dataKey="time" padding={{left: 30, right: 30}}/>
                                        <YAxis/>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Tooltip/>
                                        <Legend style={{paddingBottom: "10px"}}/>
                                        <Line type="monotone" dataKey="Test 1" stroke="#7CB5EC" activeDot={{r: 8}}/>
                                        <Line type="monotone" dataKey="Test 2" stroke="#434348"/>
                                        <Line type="monotone" dataKey="Test 3" stroke="#90EC7D"/>
                                        <Line type="monotone" dataKey="Current Value" stroke="#F8B883"/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>                        </TabPane>
                        <TabPane tab="Savings Progression" key="4">
                            <div style={{marginBottom: "10px"}}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={configs.savingsProgression}
                                               margin={{top: 10, right: 0, left: -15, bottom: 0}}>
                                        <XAxis dataKey="time" padding={{left: 30, right: 30}}/>
                                        <YAxis/>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Tooltip/>
                                        <Legend style={{paddingBottom: "10px"}}/>
                                        <Line type="monotone" dataKey="Test 1" stroke="#7CB5EC" activeDot={{r: 8}}/>
                                        <Line type="monotone" dataKey="Test 2" stroke="#434348"/>
                                        <Line type="monotone" dataKey="Test 3" stroke="#90EC7D"/>
                                        <Line type="monotone" dataKey="Current Value" stroke="#F8B883"/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default HostGraphModal;
