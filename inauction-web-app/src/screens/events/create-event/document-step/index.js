import React, { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { connect } from "react-redux";
import { Spin, Button, Col, Input, Upload } from "antd";
import { uploadEventFiles } from "../../redux/eventActions";

const Documents = (props) => {
  const [loading, setLoading] = useState(false);
  const [docName, setDocName] = useState();
  const [documents, setDocuments] = useState([]);

  const fileRead = (file) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        let newFile = {
          uid: file.uid,
          originalname: file.name,
          mimetype: file.type,
          size: file.size,
          buffer: reader.result
        };
        resolve(newFile);
      }
    })
  }

  const beforeUpload = async (file) => {
    console.log('beforeUpload ', file)
    let res = await fileRead(file);
    setDocuments(prev => [...prev, res]);
    return false;
  }

  const removeDocument = event => {
    let newDocuments = [...documents];
    newDocuments = newDocuments.filter(el => el.uid !== event.uid);
    setDocuments(newDocuments);
  }

  const onFinish = () => {
    const { event } = props.draftEvent;
    setLoading(true);
    props.uploadEventFiles(documents, event.id)
      .then((data) => {
        setLoading(false)
        console.log('uploadEventFiles ', data)
        props.setDocuments(documents);
        props.next();
      })
      .catch(error => {
        setLoading(false)
        console.log('uploadEventFiles err ', error)
      })
  }

  console.log('documents ', documents)

  return (
    <div>
      <Spin spinning={loading} delay={500}>
        <Col span={24}>
          <div className="gx-media gx-align-items-center gx-flex-nowrap">
            <div className="gx-media-body create-event-form-gx-media-body">
              <div className="gx-media gx-align-items-center gx-flex-nowrap">
                <div className="gx-media-body event-type-form-gx-media-body">
                  <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                    <span>Upload Document</span>
                    <span className="required-label-dot">*</span>
                  </span>
                  <span>
                    <Input
                      name="documentName"
                      defaultValue={docName}
                      onChange={event => setDocName(event.target.value)}
                      placeholder='Document Name'
                      style={{ marginBottom: 8 }}
                    />
                    <Upload
                      name={docName ?? "Unnamed document"}
                      multiple={true}
                      maxCount={50}
                      accept={"application/pdf,.doc,.docx,.xls,.xlsx,.dwg"}
                      onRemove={removeDocument}
                      beforeUpload={beforeUpload}
                    >
                      <Button>
                        <UploadOutlined />
                        Click to Upload
                      </Button>
                    </Upload>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <div className={"second-step-action"} style={{ float: "right" }}>
          <Button style={{ marginLeft: 8 }} onClick={props.previous}>
            Previous
          </Button>
          <Button type="primary" disabled={documents.length == 0} onClick={onFinish}>
            Save & Next Step
          </Button>
        </div>
      </Spin>
    </div>
  );
}


const mapStateToProps = ({ authNew, events, errors }) => {
  const { draftEvent } = events;
  return { authNew, errors, draftEvent }
};

export default connect(mapStateToProps, {
  uploadEventFiles
})(Documents);
