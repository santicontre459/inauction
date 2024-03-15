import React from "react";
import { CheckOutlined, DeleteOutlined, EditOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import { Button, Col, Input, InputNumber, Popconfirm, Row, Select, Table } from "antd";
import { lotState, lotTypes, UnitOfMeasurement } from '../Constants';
import Text from "antd/es/typography/Text";

const { Option } = Select;

const LotsContext = ({
    index,
    lot,
    lotsLength,
    lotType,
    setLotName,
    addLotRow,
    updateLotRow,
    deleteLotRow,
    deleteLotComponent,
    currency,
    uomList
}) => {

    const tableFooter = pageData => {
        let totalCurrentValue = 0;
        let totalQualificationValue = 0;
        pageData.forEach(({ currentValue, qualificationValue }) => {
            totalCurrentValue += currentValue;
            totalQualificationValue += qualificationValue;
        });
        return (
            <Row gutter={[16, 0]}>
                <Col span={8}>
                    {'Total: '}
                </Col>
                <Col span={8}>
                    <span>{'Current Value: '}</span>
                    <Text>{` ${currency} ${totalCurrentValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                </Col>
                <Col span={8}>
                    <span>{'Qualification Value: '}</span>
                    <Text>{` ${currency} ${totalQualificationValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                </Col>
            </Row>
        );
    }

    const columns = [
        {
            title: '#Id',
            dataIndex: 'Id',
            key: 'Id',
            sorter: (a, b) => a.Id - b.Id,
            width: '3%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: '14%',
            render: (text, record) => <>
                {record.action === lotState.edit ?
                    <Input
                        size="small"
                        defaultValue={text}
                        onChange={event => updateLotRow('name', event.target.value, record, index)}
                    />
                    :
                    text
                }
            </>,
        },
        {
            title: 'Unit of Measurement (UoM)',
            dataIndex: 'uom',
            key: 'uom',
            width: '14%',
            render: (text, record) => <>
                {record.action === lotState.edit ?
                    <Select
                        listHeight={80}
                        getPopupContainer={trigger => trigger.parentNode}
                        style={{ width: '100%' }} size="small" placeholder={'Unit Of Measurement'}
                        defaultValue={text}
                        onChange={value => updateLotRow('uom', value, record, index)}
                    >
                        {uomList.map(uom => (
                            <Option value={uom.id}>
                                {uom.title}
                            </Option>
                        ))}
                    </Select>
                    :
                    uomList.find(u => u.id == text)?.title
                }
            </>,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            width: '14%',
            render: (text, record) => <>
                {record.action === lotState.edit ?
                    <InputNumber
                        size="small"
                        style={{ width: "100%" }}
                        defaultValue={text}
                        onChange={number => updateLotRow('quantity', number, record, index)}
                    />
                    :
                    text
                }
            </>,
        },
        {
            title: `Current Price (${currency})`,
            dataIndex: "currentPrice",
            key: "currentPrice",
            width: '14%',
            render: (text, record) => <>
                {record.action === lotState.edit ?
                    <InputNumber
                        size="small"
                        style={{ width: "100%" }}
                        defaultValue={text}
                        onChange={number => {
                            console.log('updateLotRow ', number)
                            updateLotRow('currentPrice', number, record, index)
                        }}
                    />
                    :
                    `${currency} ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
            </>,
        },
        {
            title: `Qualification Price (${currency})`,
            dataIndex: "qualificationPrice",
            key: "qualificationPrice",
            width: '14%',
            render: (text, record) => <>
                {record.action === lotState.edit ?
                    <InputNumber
                        size="small"
                        style={{width: "100%"}}
                        defaultValue={text}
                        onChange={number => updateLotRow('qualificationPrice', number, record, index)}
                    />
                    :
                    `${currency} ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
            </>,
        },
        {
            title: "Current Value",
            dataIndex: "currentValue",
            key: "currentValue",
            render: text => `${currency} ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            width: '9%',
        },
        {
            title: "Qualification Value",
            dataIndex: "qualificationValue",
            key: "qualificationValue",
            render: text => `${currency} ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            width: '9%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '9%',
            render: (text, record) => <>
                {text === lotState.edit ?
                    <Button
                        style={{ margin: "5px" }}
                        type="primary"
                        ghost
                        size="small"
                        onClick={() => updateLotRow('action', lotState.submitted, record, index)}
                    >
                        <CheckOutlined style={{ color: 'white' }} title="confirm" />
                    </Button>
                    :
                    <Button
                        style={{ margin: "5px" }}
                        type="primary"
                        ghost
                        size="small"
                        onClick={() => updateLotRow('action', lotState.edit, record, index)}
                    >
                        <EditOutlined style={{ color: 'white' }} title="edit" />
                    </Button>
                }
                <Popconfirm
                    placement="topRight"
                    title="Are you sure?"
                    icon={<QuestionCircleTwoTone twoToneColor="red" />}
                    onConfirm={() => deleteLotRow(record, index)}
                >
                    <Button style={{ margin: "5px", marginRight: '0px', float: 'right' }} type="primary" ghost size="small">
                        <DeleteOutlined style={{ color: 'white' }} title="remove" />
                    </Button>
                </Popconfirm>
            </>,
        },
    ];

    return (
        <>
            <Row style={{ paddingBottom: '10px' }} gutter={[16, 0]}>
                <Col xs={24} sm={24} md={14} lg={12} xl={10} style={{ display: 'inline-flex' }}>
                    <span className="create-event-labels" style={{ width: 'inherit', marginTop: '10px' }}>
                        {'Lot Name: '}
                    </span>
                    <Input
                        className="lot-input-size"
                        defaultValue={lot.lotName}
                        onChange={event => setLotName(index, event.target.value)}
                    />
                </Col>
                {lotsLength > 1 && (
                    <Col xs={24} sm={24} md={10} lg={12} xl={14}>
                        <Popconfirm
                            placement="topRight"
                            title="Are you sure？"
                            icon={<QuestionCircleTwoTone twoToneColor="red" />}
                            onConfirm={() => deleteLotComponent(index)}
                        >
                            <Button type={'danger'} style={{ float: 'right', marginBottom: '0px' }}>
                                <i className="icon icon-trash" style={{ display: 'flex' }} />
                            </Button>
                        </Popconfirm>
                    </Col>
                )}
            </Row>
            <Table
                className="gx-table-responsive user-profile-gx-media-card"
                style={{ paddingTop: "16px" }}
                columns={columns}
                dataSource={[...lot.data]}
                pagination={false}
                footer={tableFooter}
                bordered
            />
            <Button onClick={() => addLotRow(index)} style={{ marginTop: "5px" }}>
                Add Line Item
            </Button>
            {lotType === lotTypes.MultipleLots && <hr />}
        </>
    );
};

export default LotsContext;
