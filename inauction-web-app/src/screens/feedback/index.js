import React, { Component } from "react";
import Auxiliary from "../../util/Auxiliary";
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Input, Col, Row, Rate, Alert } from "antd";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../components/breadcrumbs";
import './index.css'
import IntlMessages from "../../util/IntlMessages";

const customer = JSON.parse(localStorage.getItem('jwtUser'));
const {TextArea} = Input;

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      design: {
        rating: 0,
        feedback: ''
      },
      userFriendly: {
        rating: 0,
        feedback: ''
      },
      innovation: {
        rating: 0,
        feedback: ''
      },
      support: {
        rating: 0,
        feedback: ''
      },
      useful: {
        rating: 0,
        feedback: ''
      },
      other: ''
    }
  }

  onRateSave = (value) => {
    console.log("value: ", value);
  };

  componentDidMount() {

  }

  render() {
    return (
      <Auxiliary>
        <Helmet>
            <title>iNauction Tool | {customer.subrole.description} | Leave Feedback</title>
        </Helmet>
        <Breadcrumbs description={"iNauction Tool - Feedback"} name={<IntlMessages id="user.feedback.informational_notes.name" />} />
        <Alert
          className="module-informational-notes"
          message={<IntlMessages id="user.feedback.informational_notes.message" />}
          description={<IntlMessages id="user.feedback.informational_notes.description" />}
          type="info"
          showIcon
        />
        <div className="gx-main-content">
          <Row gutter={[16, 0]}>
            <Col xl={3} lg={3} md={24} sm={24} xs={24}/>
            <Col xl={18} lg={18} md={24} sm={24} xs={24} style={{ "display": "inline-block" }}>
              <Card className="gx-card feedback-form-gx-card input-form-border"
                title={<IntlMessages id="user.feedback.label.design" />}
              >
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                  <div className="gx-media-body feedback-form-gx-media-body">
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                      <IntlMessages id="user.feedback.rating" /> &nbsp;
                    </span>
                    <Rate onChange={this.onRateSave} />
                  </div>
                </div>
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                  <div className="gx-media-body feedback-form-gx-media-body">
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                        <IntlMessages id="user.feedback.design_input" />&nbsp;
                    </span>
                    <Input
                      onChange={(event) => this.setState({ firstName: event.target.value })}
                      placeholder='Leave feedback'
                    />
                  </div>
                </div>
              </Card>
              <Card
                className="gx-card feedback-form-gx-card input-form-border"
                title={<IntlMessages id="user.feedback.label.user_friendly" />}
              >
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                  <div className="gx-media-body feedback-form-gx-media-body">
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                      <IntlMessages id="user.feedback.rating" /> &nbsp;
                    </span>
                    <Rate onChange={this.onRateSave} />
                  </div>
                </div>
                  <div className="gx-media gx-align-items-center gx-flex-nowrap">
                    <div className="gx-media-body feedback-form-gx-media-body">
                      <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                        <IntlMessages id="user.feedback.user_friendly_input" />&nbsp;
                      </span>
                      <Input
                        onChange={(event) => this.setState({ firstName: event.target.value })}
                        placeholder='Leave feedback'
                      />
                    </div>
                  </div>
              </Card>
              <Card
                className="gx-card feedback-form-gx-card input-form-border"
                title={<IntlMessages id="user.feedback.label.innovation" />}
              >
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                  <div className="gx-media-body feedback-form-gx-media-body">
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                      <IntlMessages id="user.feedback.rating" /> &nbsp;
                    </span>
                    <Rate  onChange={this.onRateSave}/>
                  </div>
                </div>
                  <div className="gx-media gx-align-items-center gx-flex-nowrap">
                    <div className="gx-media-body feedback-form-gx-media-body">
                      <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                        <IntlMessages id="user.feedback.innovation" />&nbsp;
                      </span>
                        <Input
                          onChange={(event) => this.setState({ firstName: event.target.value })}
                          placeholder='Leave feedback'
                        />
                    </div>
                  </div>
              </Card>
              <Card className="gx-card feedback-form-gx-card input-form-border"
                title={<IntlMessages id="user.feedback.label.support" />}
              >
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                  <div className="gx-media-body feedback-form-gx-media-body">
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                      <IntlMessages id="user.feedback.rating" /> &nbsp;
                    </span>
                    <Rate onChange={this.onRateSave} />
                  </div>
                </div>
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                  <div className="gx-media-body feedback-form-gx-media-body">
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                      <IntlMessages id="user.feedback.support" />&nbsp;
                    </span>
                    <Input
                      onChange={(event) => this.setState({ firstName: event.target.value })}
                      placeholder='Leave feedback'
                    />
                  </div>
                </div>
              </Card>
              <Card className="gx-card feedback-form-gx-card input-form-border"
                  title={<IntlMessages id="user.feedback.label.useful" />}
              >
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                  <div className="gx-media-body feedback-form-gx-media-body">
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                      <IntlMessages id="user.feedback.rating" /> &nbsp;
                    </span>
                    <Rate  onChange={this.onRateSave} />
                  </div>
                </div>
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                  <div className="gx-media-body feedback-form-gx-media-body">
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                      <IntlMessages id="user.feedback.useful" />&nbsp;
                    </span>
                    <Input
                      onChange={(event) => this.setState({ firstName: event.target.value })}
                      placeholder='Leave feedback'
                    />
                  </div>
                </div>
              </Card>
              <Card className="gx-card feedback-form-gx-card input-form-border"
                title={<IntlMessages id="user.feedback.label.other" />}
              >
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                  <div className="gx-media-body feedback-form-gx-media-body">
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                      <IntlMessages id="user.feedback.other" />&nbsp;
                    </span>
                    <TextArea rows={4}/>
                  </div>
                </div>
              </Card>
              <Button type="primary"  className="ant-btn ant-btn-md" style={{marginRight:"0px","width":"100%"}}>
                <span>
                  <IntlMessages id="user.feedback.submit_feedback" />
                </span>
              </Button>
            </Col>
            <Col xl={3} lg={3} md={24} sm={24} xs={24}/>
          </Row>
        </div>
      </Auxiliary>
    )
  }
}
export default Feedback;
