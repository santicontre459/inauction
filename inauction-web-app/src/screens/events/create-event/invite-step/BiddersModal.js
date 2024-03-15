import React, { useEffect, useState } from "react";
import { AlignCenterOutlined } from '@ant-design/icons';
import { Modal, Table } from "antd";

export const columns = [
    {
        title: "Company Name",
        dataIndex: "companyName",
    },
    {
        title: "NIPT",
        dataIndex: "nipt",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Select Participant",
        dataIndex: "participant",
    }
];
 
const BiddersModal = (props) => {
    const [bidderList, setBidderList] = useState([]);
    const [selectedBidders, setSelectedBidders] = useState([]);
    const [state, setState] = useState({
        filteredInfo: {},
        sortedInfo: {},
    });

    useEffect(() => {
        prepareTableData(props.bidders)
    }, [props.bidders])

    const prepareTableData = (bidders) => {
        let data = [];
        bidders.forEach((item, index) =>
            data.push({
                key: index,
                userid: item.id,
                name: `${item.firstName} ${item.lastName}`,
                email: item.email,
                company: item.company?.name || ''
            })
        );
        setBidderList(data);
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedBidders(selectedRows);
        },
    };

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'company',
            key: 'company',
            sorter: (a, b) => a.company.localeCompare(b.company),
            sortOrder: state.sortedInfo.columnKey === 'company' && state.sortedInfo.order,
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: state.sortedInfo.columnKey === 'name' && state.sortedInfo.order,
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortOrder: state.sortedInfo.columnKey === 'email' && state.sortedInfo.order,
        },
    ];

    return (
        <Modal
            width={600}
            title={<>
                <AlignCenterOutlined />
                <span>{props.title}</span>
            </>}
            visible={props.visible}
            onOk={() => {
                props.onOk(selectedBidders)
            }}
            onCancel={props.onCancel}
            okText="Add Invitations"
            cancelText="Close"
        >
            <Table
                size="small"
                columns={columns}
                dataSource={bidderList}
                rowSelection={rowSelection}
                onChange={handleChange}
            />
        </Modal>
    );
}

export default BiddersModal;
