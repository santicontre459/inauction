
import React from 'react';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Divider, Input, Button } from 'antd';

const columns = [
  {
    title: 'Line Item #ID',
    dataIndex: 'itemId',
    key: 'itemId',
    render: text => <span> 12345678</span>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <Input size="small" />,
  },
  {
    title: 'Unit of Measurement (UoM)',
    dataIndex: 'uom',
    key: 'uom',
    render: text => <Input  size="small" />,
  },

  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: text => <Input size="small"  />,
  },
  {
    title: 'Current Price',
    dataIndex: 'currentPrice',
    key: 'currentPrice',
    render: text => <Input  size="small" />,
  },
  {
    title: 'Qualification Price',
    dataIndex: 'qualificationPrice',
    key: 'qualificationPrice',
    render: text => <Input  size="small" />,
  },
  {
    title: 'Current Value',
    dataIndex: 'currentValue',
    key: 'currentValue',
    render: text => <Input  size="small" />,
  },
  {
    title: 'Qualification Value',
    dataIndex: 'qualificationValue',
    key: 'qualificationValue',
    render: text => <Input  size="small" />,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <CheckOutlined title="confirm" />
        <Divider type="vertical" />
        <DeleteOutlined title="remove" />
      </span>
    ),
  },
];

const data = [];

const onClick = () => {
  data.push({})
}


const LotsContext = (index) => {
  return (
    <>
      <span><Input style={{ 'width': '50%' }}></Input>#1579078689900</span>
      <Table size="small" key={index} columns={columns} dataSource={data} pagination={false} />
      <Button onClick={onClick}>Add Line Item</Button>
    </>
  )
}
export default LotsContext;

