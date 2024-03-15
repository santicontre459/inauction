import React, { Component } from "react";
import { Card, List, Typography } from "antd";

const data = [
  'It is the iNegotio’s policy not to tolerate any fraud and corruption in the procurement procedures or during ' +
  'the execution of contracts that are signed with through the negotiation of iNegotio. iNegotio requires the ' +
  'highest standard of ethical behavior from its own staff and from the companies and individuals bidding in the ' +
  'procurement procedures through iNegotio portal. Fraudulent or corrupt practices include the solicitation, ' +
  'payment or receipt of bribes, gratuities or kickbacks, or the manipulation of contracts through any form of ' +
  'misrepresentation, fraudulent or corrupt practices.',

  'Accordingly, any bidder, contractor or consultant firm, contracted to provide goods or services through ' +
  'iNegotio and that is found by iNegotio, after appropriate investigations, to have engaged in a corrupt or ' +
  'fraudulent practices will be declared ineligible to bid for contracts published with iNegotio portal. Such ' +
  'ineligibility may be for a specific period of time or indefinitely according to the gravity of the offense.',

  'The Blacklisted person/company included in the Consolidated Blacklist shall not be allowed to participate in ' +
  'the bidding for contracts procured through iNegotio during the period of disqualification unless it is ' +
  'delisted by iNegotio.',

  'A joint venture or consortium which is Blacklisted or which has Blacklisted member/s and/or partner/s as well' +
  ' as a person/company who is a member of a Blacklisted joint venture or consortium are, likewise, not allowed ' +
  'to participate in any iNegotio procurement procedures during the period of disqualification.',

  'iNegotio will disqualify a bidder from participating in the procurement procedures for a period from 6 months' +
  ' up to 3 years if iNegotio will prove that bidders are responsible for one or more of the following',

  'Any bidder will be disqualified indefinitely from by iNegotio procurement procedures if proved that the bidder ' +
  'is bankrupt and its capital are included in the enforcement process by the bailiff or are in the process of ' +
  'liquidation.',
];

class Blacklist extends Component {

  render() {
    return (
      <Card className="gx-card user-profile-gx-card input-form-border" title={"BLACKLIST - GENERAL"}>
        <span className="gx-media-bidders-details">
          Blacklist Information iNegotio
        </span>
        <List
          className="company-status-list" style={{marginTop: '10px'}}
          size={"small"}
          footer={<div>* This information is provided by iNegotio Experts.</div>}
          bordered={false}
          dataSource={data}
          split={false}
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

export default Blacklist;
