import React from "react";
import { Card, Select, Tabs } from "antd";

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Position extends React.Component {
  state = {
    tabPosition: 'top',
  };
  changeTabPosition = (tabPosition) => {
    this.setState({tabPosition});
  };

  render() {
    return (
      <Card className="gx-card" title="Position">
        <div className="gx-mb-3">
          Tab position：
          <Select
            value={this.state.tabPosition}
            onChange={this.changeTabPosition}
            dropdownMatchSelectWidth={false}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
          </Select>
        </div>
        <Tabs tabPosition={this.state.tabPosition}>
          <TabPane tab="Tab 1" key="1">Content of Tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default Position;
