import React, { Component } from "react";
import { Tag, Row, Col } from "antd";
import Auxiliary from "../../../../util/Auxiliary";

class Feed extends Component {

    render() {
        return (
            <Auxiliary>
                <div className="gx-media-event-details"
                      style={{borderBottom: "2px solid rgb(62, 134, 156)", width:"100%"}}
                >
                        {/*<IntlMessages id=""/>*/}
                    The Live Auction Feed will provide real-time notifications of messages and changes to the auction settings.
                </div>
                <div style={{
                    maxHeight: "100px",
                    borderBottom: "2px solid rgb(62, 134, 156)",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}>
                    <div style={{height: "90px", overflow: "auto"}}>
                        {this.props.notifications.map(item => (
                            <Row style={{marginLeft: "0", marginRight: "0"}}>
                                <Col span={24}>
                                    <Tag color="blue">New Notification</Tag>
                                    <span style={{color: "grey"}}> <b>{item.time}</b> </span>
                                    <span> {item.message} </span>
                                </Col>
                            </Row>
                        ))}
                    </div>
                </div>
            </Auxiliary>
        )
    }
}

export default Feed;