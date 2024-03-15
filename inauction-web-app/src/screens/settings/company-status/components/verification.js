import React, { Component } from "react";
import { Card, List, Typography } from "antd";

const data = [
  'It is the iNegotio’s policy not to allow any user who don\'t match the critters of participating in ' +
  'e-procurement procedure. Once you were registered, you provided your NIPT and personal/company information.' +
  ' Critters are simple, you need to be a verified user, not just a registered user.',

  'In order to be more transparent in the procurement process we need to make sure that you provide your data ' +
  'correctly or you are not a fraud. We can\'t allow just registered users to enter procurements real time auctions' +
  '. Our data policy is just simple as that.',

  'The verification procedure is very simple, you just need to upload a document,company contract, or simple a ' +
  'paper that proves that your company or nipt is valid. Once you upload the document, an iNegotio Expert will ' +
  'validate it according to Albania Procurement Rules. The verification response will be send to you through an ' +
  'email or notification.',

  'What happens if you don\'t get verified/certified/qualified or if you don\'t upload a document in the next 5 ' +
  'days? Your account will be deactivated and you can\'t access it anymore or try to register anymore.',
];

class Verification extends Component {

  render() {
    return (
      <Card className="gx-card user-profile-gx-card input-form-border" title={"INEGOTIO LTD. - VERIFICATION"}>
        <span className="gx-media-bidders-details">
          Company - User Verification Procedure
        </span>
        <List className="company-status-list" style={{marginTop:'10px'}}
          footer={<div>* This information is provided by iNegotio Experts.</div>}
          bordered={false}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>&#8226;</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default Verification;
