import React from "react";
import { Input, Modal } from "antd";

const { TextArea } = Input;

class AddMessage extends React.Component {

    state = {
        event: this.props.eventName,
        visible: false,
        from: 'Fatjon Ismailaj',
        to: 'Eglon Metalia',
        content: "",
    };

    onOk = e => {
        this.props.onOk(this.state.from, this.state.to, this.state.content);
        this.setState({from: 'Fatjon Ismailaj'});
        this.setState({to: 'Eglon Metalia'});
        this.setState({content: ''});
    };
    onCancel = e => {
        this.props.handleCancel();
        this.setState({from: 'Fatjon Ismailaj'});
        this.setState({to: 'Eglon Metalia'});
        this.setState({content: ''});
    };

    render() {
        const {event} = this.state;
        this.state.visible = this.props.visibility;
        return (
            <Modal
                title={`Event : ${event}`}
                visible={this.state.visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
            >

                <div className="gx-modal-box-row">
                    <div className="gx-modal-box-form-item">
                        <div className="gx-form-group">
                            From: <Input
                            placeholder="From"
                            value={this.state.from}
                            onChange={(event) => this.setState({from: event.target.value})}
                        />
                        </div>
                        <div className="gx-form-group">
                            To:
                            <Input
                                placeholder="To"
                                value={this.state.to}
                                onChange={(event) => this.setState({to: event.target.value})}
                            />
                        </div>
                        <div className="gx-form-group">
                            Text Message:
                            <TextArea
                                name="content"
                                placeholder="Text message"
                                value={this.state.content}
                                onChange={(event) => this.setState({content: event.target.value})}
                                rows={4}/>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default AddMessage;
