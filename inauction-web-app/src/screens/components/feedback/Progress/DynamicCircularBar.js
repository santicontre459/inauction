import React from "react";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Card, Progress} from "antd";

const ButtonGroup = Button.Group;

class DynamicCircularBar extends React.Component {
  state = {
    percent: 0,
  };
  increase = () => {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({percent});
  };
  decline = () => {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({percent});
  };

  render() {
    return (
      <Card title="Dynamic CircularBar" className="gx-card">
        <Progress type="circle" percent={this.state.percent}/>
        <ButtonGroup>
          <Button onClick={this.decline} icon={<MinusOutlined />}/>
          <Button onClick={this.increase} icon={<PlusOutlined />}/>
        </ButtonGroup>
      </Card>
    );
  }
}

export default DynamicCircularBar;
