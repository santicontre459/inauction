import React, { Component } from "react";
import { Row } from "antd";
import MessageCard from '../components/Messages/messageCard'

class Messages extends Component {

    render() {
        return (
            <Row>
                {this.props.messages.map(message =>
                    <MessageCard
                        text={message.content}
                        to={message.to}
                        from={message.from}
                        date={message.sendDate}
                    />
                )}
            </Row>
        )
    }
}

export default Messages;