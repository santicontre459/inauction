import React, { Component } from "react";
import { Tabs, Button } from "antd";
import { Helmet } from "react-helmet";
import './index.css';
import { Breadcrumbs } from "../../../components/breadcrumbs";
import Auxiliary from "../../../util/Auxiliary";
import QualificationBids from "./qualificationBids";
import LiveAuction from '../components/liveAuction/liveAuction';
import Messages from './messages'
import Documents from "../components/Documents/documents";
import AddMessage from '../components/Messages/addMessage';
import OverviewComponent from "../components/Overview/overview";
import Questionnaire from "../components/Overview/Questionnaire/questionnaire";
import data from "../components/data"
import { getEventDetails } from "../../../redux/actions/eventActions";


const TabPane = Tabs.TabPane;
const customer = JSON.parse(localStorage.getItem('jwtUser'));

class Auction extends Component {

    async componentDidMount() {
        if (this.props.match.params.id) {
            getEventDetails(this.props.match.params.id)
                .then(res => {
                    console.log('getEventDetails ', res.data)
                    this.setState({ data: res.data });
                })
                .catch(err => {
                    console.log('getEventDetails ', err);
                })
        }
    }

    showAddMessage = () => {
        this.setState({
            addMessageModal: true,
        });
    };
    cancelAddMessage = () => {
        this.setState({
            addMessageModal: false,
        });
    };

    addNewMessage = (from, to, text) => {
        console.log(text);
        this.setState({
            addMessageModal: false,
            messages: this.state.messages.concat(
                [{
                    category: 'Outbox',
                    from: from,
                    to: to,
                    sendDate: '25 December 2019 13:49 GMT',
                    content: text,
                }]
            ),
        });
    };
    newMessage = <Button type="primary" onClick={this.showAddMessage}>New Message</Button>;

    state = {
        operations: null,
        addMessageModal: false,
        messages: data.messages,
    };

    callback = (key) => {
        (key === "4") ? (
            this.setState({
                operations: this.newMessage,
            })
        ) : (
            this.setState({
                operations: null,
            })
        );
    };

    render() {
        return (
            <Auxiliary>
                <Helmet>
                    <title>iNauction Tool  | Auction Overview </title>
                </Helmet>
                <AddMessage
                    eventName={"Event test"}
                    showModal={this.showModal}
                    visibility={this.state.addMessageModal}
                    handleCancel={this.cancelAddMessage}
                    onOk={this.addNewMessage}
                />
                <Breadcrumbs description={"Auction Overview"} name={"Overview"} />
                <Tabs onChange={this.callback} type="card" tabBarExtraContent={this.state.operations}>
                    <TabPane tab="Overview" key="1">
                        <OverviewComponent data={this.state.data} />
                    </TabPane>
                    <TabPane tab="Documents" key="6">
                        <Documents files={this.state.data?.files || []} />
                    </TabPane>
                    {
                        this.state.data?.hasQuestionnaire && this.state.data?.questionNaires && this.state.data?.questionNaires.length > 0 &&
                        <TabPane tab="Questionnaire" key="2">
                            <Questionnaire data={this.state.data} />
                        </TabPane>
                    }
                    <TabPane tab="Qualification Bids" key="3">
                        <QualificationBids data={this.state.data} />
                    </TabPane>
                    <TabPane tab="Live Auction" key="4">
                        <LiveAuction />
                    </TabPane>
                    <TabPane tab="Messages" key="5">
                        <Messages messages={this.state.messages} />
                    </TabPane>
                </Tabs>
            </Auxiliary>
        )
    }
}

export default Auction;


