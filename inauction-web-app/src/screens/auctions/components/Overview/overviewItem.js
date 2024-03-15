import React, { Component } from "react";
import { Col, Row } from "antd";


class OverviewItem extends Component {
    render() {
        const { title, data } = this.props;

        return (
            <div className="auct-row" >
                <h4 className="gx-mt-0">{title} </h4>
                {
                    Object.keys(data).map((key) => {
                        if (key !== "Questionnaire Name") {
                            return (
                                <p className="gx-mb-2">
                                    <b>{key} : </b>
                                    {data[key]}
                                </p>
                            )
                        }
                    })
                }
            </div>
        );
    }
};
export default OverviewItem;
