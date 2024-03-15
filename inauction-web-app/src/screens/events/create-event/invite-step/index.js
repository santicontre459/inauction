import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, Button, Col, Descriptions, Row, Table, Popconfirm, Spin } from "antd";
import BiddersModal from "./BiddersModal";
import EmailInvitationsModal from "./EmailInvitationModal";
import { getBidders, getCategoryBidders } from '../../../../redux/actions/bidderActions'
import { addInvitationsEvent, publishEvent } from "../../redux/eventActions";

const getInvitations = (selectedBidders, selectedCategoryRelatedBidders, emailInvitationBidders) => {
  const newInvitations = [];
  selectedBidders.forEach((item, index) => newInvitations.push({
    key: index,
    email: item.email,
    invitationMethod: 'BIDDERS DATABASE',
    invitationStatus: 'PENDING',
  }));
  let length = newInvitations.length;
  selectedCategoryRelatedBidders.forEach((item, index) => newInvitations.push({
    key: length + index,
    email: item.email,
    invitationMethod: 'EVENT CATEGORY',
    invitationStatus: 'PENDING',
  }));
  length = newInvitations.length;
  emailInvitationBidders.forEach((email, index) => newInvitations.push({
    key: length + index,
    email: email,
    invitationMethod: 'EMAIL',
    invitationStatus: 'PENDING',
  }));
  return newInvitations;
}

const Invite = props => {
  const [invitatins, setInvitations] = useState([]);
  const [selectedBidders, setSelectedBidders] = useState([]);
  const [selectedCategoryRelatedBidders, setSelectedCategoryRelatedBidders] = useState([]);
  const [emailInvitationBidders, setEmailInvitationBidders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [invitePopModalBidders, setInvitePopModalBidders] = useState(false);
  const [invitePopModalCategory, setInvitePopModalCategory] = useState(false);
  const [invitePopModalEmailInvitation, setInvitePopModalEmailInvitation] = useState(false);

  useEffect(() => {
    const { event } = props.draftEvent; 
    props.getCategoryBidders(event?.activity?.id);
    props.getBidders();
  }, [])

  useEffect(() => {
    setInvitations(getInvitations(selectedBidders, selectedCategoryRelatedBidders, emailInvitationBidders));
  }, [selectedBidders, selectedCategoryRelatedBidders, emailInvitationBidders])

  const onBiddersModalOk = newBidders => {
    setSelectedBidders(prev => [...prev, ...newBidders.filter(item => (invitatins.findIndex(i => i.email == item.email) == -1))]);
    setInvitePopModalBidders(false);
  }

  const onCategoryRelatedBiddersModalOk = newBidders => {
    setSelectedCategoryRelatedBidders(prev => [...prev, ...newBidders.filter(item => (invitatins.findIndex(i => i.email == item.email) == -1))]);
    setInvitePopModalCategory(false);
  }

  const onEmailInvitationModalOk = email => {
    console.log('onEmailInvitationModalOk ', email)
    if (invitatins.findIndex(i => i.email == email) == -1) {
      const newEmailInvitationBidders = [...emailInvitationBidders];
      newEmailInvitationBidders.push(email);
      setEmailInvitationBidders(newEmailInvitationBidders);
    }
    setInvitePopModalEmailInvitation(false);
  }

  const removeInvitaion = (data) => {
    if (data.invitationMethod == 'BIDDERS DATABASE') {
      setSelectedBidders(prev => prev.filter(item => item.email != data.email));
    }
    else if (data.invitationMethod == 'EVENT CATEGORY') {
      setSelectedCategoryRelatedBidders(prev => prev.filter(item => item.email != data.email));
    }
    else if (data.invitationMethod == 'EMAIL') {
      setEmailInvitationBidders(prev => prev.filter(email => email != data.email));
    }
  }

  const columns = [
    {
      title: 'Username/Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Invitation Method',
      dataIndex: 'invitationMethod',
      key: 'invitationMethod',
    }, {
      title: 'Invitation Status',
      dataIndex: 'invitationStatus',
      key: 'invitationStatus',
    }, {
      title: 'Action',
      render: (value, data) => (
        <Popconfirm
          title="Are you sure remove this invitation?"
          onConfirm={() => removeInvitaion(data)}
          onCancel={() => { }}
          okText="Yes"
          cancelText="No"
        >
          <span className="gx-link">Delete</span>
        </Popconfirm>
      )
    },
  ];

  const onSave = () => {
    const { event } = props.draftEvent; 
    setLoading(true);
    props.addInvitationsEvent(event?.id, selectedBidders, selectedCategoryRelatedBidders, emailInvitationBidders)
      .then((res) => {
        setLoading(false);
      })
      .catch(err => {
        console.log('onsave err ', err)
        setLoading(false);
      })
  }

  const onPublish = () => {
    const { event } = props.draftEvent; 
    setLoading(true);
    props.publishEvent(event?.id)
      .then((res) => {
        setLoading(false);
        setTimeout(() => { props.history.push('/events/all') }, 1000);
      })
      .catch(err => {
        setLoading(false);
      })
  }

  return <>

    <BiddersModal
      visible={invitePopModalBidders}
      title={'Participants List based on iNAuction Database. You can make custom Invitations'}
      bidders={props.bidderList}
      onOk={onBiddersModalOk}
      onCancel={() => setInvitePopModalBidders(false)}
    />

    <BiddersModal
      visible={invitePopModalCategory}
      title={'Participants List based on Event Category. You can make custom Invitations'}
      bidders={props.categoryBidderList}
      onOk={onCategoryRelatedBiddersModalOk}
      onCancel={() => setInvitePopModalCategory(false)}
    />

    <EmailInvitationsModal
      visible={invitePopModalEmailInvitation}
      onOk={onEmailInvitationModalOk}
      onCancel={() => setInvitePopModalEmailInvitation(false)}
    />

    <Alert
      message=""
      description="There are various way of inviting participants to your auction! Invite your friends sending them an Email Invitation"
      type="info"
      style={{ marginTop: '10px', marginBottom: '10px' }}
    />
    <Spin spinning={loading} delay={500}>
      <div>
        <Row style={{ marginLeft: '0px', marginRight: '0px' }}>
          <Col span={24} style={{ marginTop: '5px', marginBottom: '5px' }}>
            <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              <Descriptions.Item span={6} label={"iNAuction Bidders DB ( " + selectedBidders.length + " )"}>
                <Button onClick={() => setInvitePopModalBidders(true)}>
                  Select from
                </Button>
              </Descriptions.Item>
              <Descriptions.Item
                span={6}
                label={"Auction Category Related ( " + selectedCategoryRelatedBidders.length + " )"}
              >
                <Button onClick={() => setInvitePopModalCategory(true)}>Select from</Button>
              </Descriptions.Item>
              <Descriptions.Item label="Email Invitation">
                <Button onClick={() => setInvitePopModalEmailInvitation(true)}>
                  Select from
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24} style={{ marginTop: '5px', marginBottom: '5px' }}>
            <Table
              size="small"
              columns={columns}
              dataSource={invitatins}
              pagination={false}
            />
            <Descriptions layout="vertical" bordered size="small" style={{ marginTop: '10px' }}>
              <Descriptions.Item>
                <p>
                  List of Bidders Invited to the Event
                </p>
                <p>
                  So, now the final step is to invite participants, to your Auction. There are
                  three ways, a participant can be invited.
                  You can invite based on your auction category, or bidder iNAuction DB,
                  or also by inviting them by email, if they are yet to be registered to iNAuction.
                </p>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </div>
    </Spin>
    <div className={"second-step-action"} style={{ float: "right" }}>
      <Button style={{ marginLeft: 8 }} onClick={props.previous}>
        Previous
      </Button>
      <Button type="primary" disabled={invitatins.length == 0} onClick={onSave}>
        Save
      </Button>
      <Button type="primary" onClick={onPublish}>
        Publish
      </Button>
    </div>
  </>;
}

const mapStateToProps = ({ bidders, events, errors }) => {
  const { bidderList, categoryBidderList } = bidders;
  const { draftEvent } = events;
  return { bidderList, categoryBidderList, errors, draftEvent }
};

export default connect(mapStateToProps, { getBidders, getCategoryBidders, addInvitationsEvent , publishEvent})(Invite);