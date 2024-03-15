import React, { Component } from "react";
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
class UploadQuestion extends Component {
    render() {
        const {title, answers} = this.props;
        return (
            <div style={{width:"100%"}}>
                <h4 className="gx-mt-0">{title}</h4>
                <p className="gx-mb-2">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </p>
            </div>
        );
    }
}

export default UploadQuestion;
