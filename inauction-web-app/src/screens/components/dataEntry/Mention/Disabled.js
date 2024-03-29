import React from "react";
import { Mention } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card } from "antd";

const {toString} = Mention;
const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];

function Disabled() {
  function onChange(editorState) {
    console.log(toString(editorState));
  }

  return (
    <Card className="gx-card" title="Disabled">
      <div className="gx-mb-3">
        <Mention
          style={{width: '100%'}}
          onChange={onChange}
          placeholder="this is disabled Mention"
          suggestions={users}
          disabled
        />
      </div>
      <Mention
        style={{width: '100%'}}
        onChange={onChange}
        placeholder="this is readOnly Mention"
        suggestions={users}
        readOnly
      />
    </Card>
  );
}

export default Disabled;
