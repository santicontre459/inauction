import React from "react";
import Widget from "../../../../components/Widget";
import { Col, Row, Tag, Layout } from "antd";

const MessageCard = ({text, to, from, date}) => {
    return (
        <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <Widget styleName="gx-card-full">
                <div className="gx-actchart gx-px-3 gx-pt-3" style={{paddingBottom: "16px"}}>
                    <Layout className="lay-row">
                        <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                            <h5 className="gx-mb-0 gx-fs-md gx-font-weight-medium">
                                From: <Tag color="cyan">{from}</Tag>
                            </h5>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                            <h5 className="gx-mb-0 gx-fs-md gx-font-weight-medium">
                                To: <Tag color="cyan" style={{marginBottom: "0"}}>{to}</Tag>
                            </h5>
                        </Col>
                    </Layout>
                    <hr style={{marginTop: "5px"}}/>
                    <h2 className="gx-mb-0 gx-fs-lg gx-font-weight-light" style={{textAlign: 'center'}}>
                        {text}
                    </h2>

                    <hr/>
                    <h4 className="gx-mb-0 gx-fs-md gx-font-weight-light" style={{textAlign: "center"}}>
                        Date: <i>{date}</i>
                    </h4>
                </div>
            </Widget>
        </Col>
    );
};

export default MessageCard;
