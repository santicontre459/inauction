import React, { Component } from "react";
import { Radio } from "antd";

class RadioButtonQuestion extends Component {
    state = {
        value: "",
    };
    onChange = e => {
        // Object.keys(this.props.answers).map(
        //     (answer) => {
        //         if (answer === this.state.value) {
        //             this.props.answers[answer] = false;
        //         }
        //         if (answer === e.target.value) {
        //             this.props.answers[answer] = true;
        //         }
        //     }
        // );

        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {title, answers} = this.props;
        return (
            <div style={{width:"100%"}}>
                <h4 className="gx-mt-0">{title}</h4>
                <p className="gx-mb-2">
                    <Radio.Group
                        value={this.state.value}
                        onChange={this.onChange}
                    >
                        {
                            (answers || []).map(
                                (answer) => {
                                    return (
                                        <Radio value={answer.option}>{answer.option}</Radio>
                                    )
                                }
                            )
                        }
                    </Radio.Group>
                </p>
            </div>
        );
    }
}

export default RadioButtonQuestion;
