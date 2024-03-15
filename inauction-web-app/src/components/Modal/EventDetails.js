import React from 'react';
import { Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Tag, Divider,  } from 'antd';
import { formatCurrency } from '../../util/common';
import './EventDetails.css';

const statusLabelColor = ['#108ee9', '#fa8c16', '#20ad8a', '#3f869c', '#ea5328', '#e74c3c', '#f7a35c', '#f7a35c', '#f7a35c', '#f7a35c', '#f7a35c']
const statusLabel = ['DRAFT', 'WAITING REVIEW', 'READY TO PUBLISH', 'PUBLISHED', 'OPEN', 'COMPLETED', 'AWARDED', 'CANCELLED', 'DELETED'];

const EventDetailsModal = ({ showModal, data, onClose }) => {
    const [duedate, setDuedate] = useState({});
    const [event, setEvent] = useState({});
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(showModal);
        if (showModal) {
            setEvent(data.resource || {});
            setDuedate(data.start)
        }
    }, [showModal])

    return (
        <Modal
            title={event.referenceNumber}
            centered
            visible={isVisible}
            onOk={onClose}
            className='event-details-modal'
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <h3 >{event.title}</h3>
            <p>{event.description}</p>
            <div className='desc-row'>
                <label>Event Category :</label>
                <p>{event.eventCategory?.name}</p>
            </div>
            <div className='desc-row'>
                <label>Activity :</label>
                <p>{event.activity?.name}</p>
            </div>
            <div className='desc-row'>
                <label>Status :</label>
                <Tag color={statusLabelColor[event.progressStatus || 0]}>{statusLabel[event.progressStatus || 0]}</Tag>
            </div>
            <div className='desc-row'>
                <label>Event Type :</label>
                <Tag>{event.eventType == 0 ? 'RFQ' : event.eventType == 1 ? 'Online Auction' : 'Only Questionnaire'}</Tag>
            </div>
            <div className='desc-row'>
                <label>Due Date :</label>
                <p>{moment(duedate).format('LLL')}</p>
            </div>
            <div className='desc-row'>
                <label>Budget :</label>
                <p>{event.totalBudget === 0 ? 'Not Defined' : formatCurrency(event.totalBudget, event.currency?.title, false)}</p>
            </div>
            <div className='desc-row'>
                <label>Experts :</label>
                <p>{event.expertsNumber}</p>
            </div>
        </Modal>
    )
}

export default EventDetailsModal;