import React, { Component } from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Menu, Card, Table, Button, Dropdown } from "antd";
import ParticipantModal from "./participantModal";

const data = [
    {
        id: 0,
        approval: 1,
        participant: "Jimmy",
        invited: "Through platform",
        registered: 1,//status
        acceptedInvitation: 1,//status
        questionnairesTotal: 1,
        questionnairesCompleted: 1,
        lotsEntered: 1,
        lotsTotal: 1,
        documentsUploaded: 3,
        messagesCount: 2,
    }, {
        id: 1,
        approval: 0,
        participant: "Chak",
        invited: "Through platform",
        registered: 1,//status
        acceptedInvitation: 1,//status
        questionnairesTotal: 1,
        questionnairesCompleted: 1,
        lotsEntered: 1,
        lotsTotal: 1,
        documentsUploaded: 1,
        messagesCount: 1,
    }, {
        id: 2,
        approval: 1,
        participant: "Griseld",
        invited: "Through platform",
        registered: 1,//status
        acceptedInvitation: 1,//status
        questionnairesTotal: 1,
        questionnairesCompleted: 1,
        lotsEntered: 1,
        lotsTotal: 1,
        documentsUploaded: 0,
        messagesCount: 0,
    }, {
        id: 3,
        approval: 1,
        participant: "Fatjon",
        invited: "Through platform",
        registered: 0,//status
        acceptedInvitation: 0,//status
        questionnairesTotal: 2,
        questionnairesCompleted: 1,
        lotsEntered: 1,
        lotsTotal: 2,
        documentsUploaded: 0,
        messagesCount: 0,
    },
];

class Participants extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        visibleParticipantModal: false,
        data,
        columns: [
            {
                title: 'Approval',
                dataIndex: 'approval',
                render: (text, record) =>
                    <div id="components-dropdown-demo-dropdown-button">
                        <Dropdown overlay={
                            <Menu onClick={
                                () => {
                                    this.setState({state: this.state.data[record.id].approval = !text});
                                }
                            }>
                                <Menu.Item key="1">
                                    {text ? 'Decline' : 'Approve'}
                                </Menu.Item>
                            </Menu>
                        }>
                            <Button>
                                {text ? <CheckOutlined style={{color: "#0000ff"}} /> :
                                    <CloseOutlined style={{color: "#ff0000"}} />}
                            </Button>
                        </Dropdown>
                    </div>,
                sorter: (a, b) => a.lot - b.lot,
            }, {
                title: 'Participant',
                dataIndex: 'participant',
                render: text => <a
                    onClick={() => {
                        this.setState({
                            visibleParticipantModal: true,
                        })
                    }}>
                    {text}</a>,
                sorter: (a, b) => a.participant.localeCompare(b.participant),
            }, {
                title: 'Invited',
                dataIndex: 'invited',
                sorter: (a, b) => a.invited.localeCompare(b.invited),
            }, {
                title: 'Status',
                dataIndex: 'registered',
                render: (text, record) => <div style={{width: "100%"}}>
                    <p>{record.registered === 1 ? (
                        <span style={{color: "#0000ff"}}><CheckOutlined /> Registered</span>
                    ) : (
                        <span style={{color: "#ff0000"}}><CloseOutlined /> Not registered</span>
                    )}</p>
                    <p>{record.acceptedInvitation === 1 ? (
                        <span style={{color: "#0000ff"}}><CheckOutlined /> Accepted invite</span>
                    ) : (
                        <span style={{color: "#ff0000"}}><CloseOutlined /> Not accepted invite</span>
                    )}</p>
                </div>,
                sorter: (a, b) => a.registered.localeCompare(b.registered),
            }, {
                title: 'Questionnaires Completed',
                dataIndex: 'questionnairesCompleted',
                render: (text, record) => <div style={{
                    width: "100%",
                    textAlign: "center"
                }}>{record.questionnairesCompleted}/{record.questionnairesTotal}</div>,
                sorter: (a, b) => a.questionnairesCompleted - b.questionnairesCompleted,
            }, {
                title: 'Lots Entered',
                dataIndex: 'lotsEntered',
                render: (text, record) => <div
                    style={{width: "100%", textAlign: "center"}}>{record.lotsEntered}/{record.lotsTotal}</div>,
                sorter: (a, b) => a.lotsEntered - b.lotsEntered,
            }, {
                title: '',
                dataIndex: 'documentsUploaded',
                width: "20%",
                render: (text, record) =>
                    <div style={{width: "100%", textAlign: "center", marginTop: "10px"}}>
                        <Button size="small" type="primary" style={{marginRight: "2px"}}
                                onClick={() => {
                                }} ghost>
                            <i className="icon icon-data-entry"/>
                            <span>({text})</span>
                        </Button>
                        <Button size="small" type="primary"
                                onClick={() => {
                                }} ghost>
                            <i className="icon icon-mail-open"/>
                            <span> ({record.messagesCount})</span>
                        </Button>
                    </div>,
            }]
    };

    render() {
        return (
            <Card title="Participants"
                  className={"gx-card user-profile-gx-card input-form-border all-events-card"}>
            <span className="gx-media-event-details">
            {/*<IntlMessages id=""/>*/} Below you can find information regarding the participating contestant.
            </span>
                <ParticipantModal visible={this.state.visibleParticipantModal}
                                  hideModal={() => {
                                      this.setState({
                                          visibleParticipantModal: false,
                                      })
                                  }}
                />
                <Table className="gx-table-responsive user-profile-gx-media-card"
                       style={{paddingTop: "16px"}}
                       columns={this.state.columns}
                       dataSource={this.state.data}
                />
            </Card>
        )
    }
}

export default Participants;
