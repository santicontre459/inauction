import React, { useState } from "react";
import { AlignCenterOutlined } from '@ant-design/icons';
import { Input, Modal, Form } from "antd";

const EmailInvitationsModal = (props) => {
    const [form] = Form.useForm();
    const [email, setEmail] = useState('');
    const onOk = () => {
        form.validateFields().then((res) => { 
            props.onOk(email);
        });
    };
    const onCancel = () => props.onCancel();

    return (
        <Modal
            title={
                <span>
                    <AlignCenterOutlined />
                    <span>You can invite participants to you auction by send them an Simple Email Invitation!</span>
                </span>
            }
            visible={props.visible}
            onOk={onOk}
            onCancel={onCancel}
            okText="Add Invitation"
            cancelText="Close"
        >
            <Form form={form}>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input autoComplete="off" placeholder='Enter email address' onChange={e => setEmail(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EmailInvitationsModal;
