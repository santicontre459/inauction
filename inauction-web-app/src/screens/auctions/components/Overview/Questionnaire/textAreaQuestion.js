import React, { Component } from "react";
import { Input } from "antd";

const { TextArea } = Input;

class TextAreaQuestion extends Component {


    render() {
        const {title, answers} = this.props;
        return (
            <div style={{width:"100%"}}>
                <h4 className="gx-mt-0">{title}</h4>
                <p className="gx-mb-2">
                    <TextArea rows={4} defaultValue={answers} />
                </p>
            </div>
        );
    }
}

export default TextAreaQuestion;
