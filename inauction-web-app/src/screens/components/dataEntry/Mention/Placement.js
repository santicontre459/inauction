import React from "react";
import { Mention } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card } from "antd";

const {toString} = Mention;

const Placement = () => {
    function onChange(contentState) {
      console.log(toString(contentState));
    }

    function onSelect(suggestion) {
      console.log('onSelect', suggestion);
    }

    return (
      <Card className="gx-card" title="Placement">
        <Mention
          style={{width: '100%'}}
          onChange={onChange}
          suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
          onSelect={onSelect}
          placement="top"
        />
      </Card>
    );
  }
;

export default Placement;
