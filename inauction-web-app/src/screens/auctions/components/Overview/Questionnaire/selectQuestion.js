import React, { Component } from "react";
import { Select } from "antd";

const {Option} = Select;

class SelectQuestion extends Component {

    onChange = (value) => console.log(`selected ${value}`);
    onBlur = () => console.log('blur');
    onFocus = () => console.log('focus');
    onSearch = (val) => console.log('search:', val);

    render() {
        const {title, answers} = this.props;
        return (
            <div style={{width:"100%"}}>
                <h4 className="gx-mt-0">{title}</h4>
                <p className="gx-mb-2">
                    <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        showSearch
                        style={{width: 200}}
                        placeholder="Select an option"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            (answers || []).map(
                                (answer) => {
                                    return (
                                        <Option value={answer.option}>{answer.option}</Option>
                                    )
                                }
                            )
                        }
                    </Select>
                </p>
            </div>
        );
    }
}

export default SelectQuestion;
