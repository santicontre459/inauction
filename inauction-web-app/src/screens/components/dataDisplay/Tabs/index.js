import React, {Component} from "react";
import { Col, Row } from "antd";
import Basic from "./Basic";
import Slide from "./Slide";
import Size from "./Size";
import Position from "./Position";
import CardTab from "./CardTab";
import CustomizeTrigger from "./CustomizeTrigger";

class Tabs extends Component {


  render() {
    return (
      <Row>
        <Col span={24}>
          <Basic/>
          <Slide/>
          <Size/>
        </Col>
        <Col span={24}>
          <Position/>
          <CardTab/>
          <CustomizeTrigger/>
        </Col>
      </Row>
    );
  }
}


export default (Tabs);
