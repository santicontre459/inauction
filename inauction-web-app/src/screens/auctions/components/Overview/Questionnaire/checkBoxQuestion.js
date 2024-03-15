import React, { Component } from "react";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

class CheckBoxQuestion extends Component {
    getCheckedValues = () => {
        const defaultCheckedList = [];
        Object.keys(this.props.answers).forEach((key) => {
            if (this.props.answers[key]) {
                (defaultCheckedList.push(key))
            }
        });
        return defaultCheckedList;
    };

    state = {
        checkedList: this.getCheckedValues(),
    };

    onChange = checkedList => {
        this.setState({
            checkedList
        });
    };


    render() {
        const {title, answers} = this.props;
        return (
            <div style={{width: "100%"}}>
                <h4 className="gx-mt-0">{title}</h4>
                <p className="gx-mb-2">
                    <CheckboxGroup
                        options={(answers || []).map(a => a.option)}
                        value={this.state.checkedList}
                        onChange={this.onChange}
                    />
                </p>
            </div>
        );
    }
}

export default CheckBoxQuestion;
