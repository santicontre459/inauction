import React from "react";
import ReceivedMessageCell from "./ReceivedMessageCell";
import SentMessageCell from "./SentMessageCell";

const Conversation = ({ conversationData, selectedUser }) => {

  return (
    <div className="gx-chat-main-content">
      {conversationData.map((conversation, index) => conversation.type === 'sent' ?
        <SentMessageCell key={index} conversation={conversation}/> :
        <ReceivedMessageCell key={index} conversation={conversation} user={selectedUser}/>
      )}
    </div>
  )
};

export default Conversation;
