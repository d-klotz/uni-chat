import React from 'react';
import { connect } from 'react-redux';

import { Container, ListItem, MessageContent, TimeLayout, MessageTitle } from './styles';

const MessageList = ({username, messages}) => {

  const me = username;

  return (
    <Container>
      {messages.map((message, index) => (
        <ListItem key={index} myMessage={message.emitter === me}>
          <MessageTitle>{message.emitter} <TimeLayout>{message.timestamp}</TimeLayout></MessageTitle>
          <MessageContent myMessage={message.emitter === me}>
            <spam>{message.content}</spam>
          </MessageContent>
        </ListItem>
      ) )}
    </Container>
  );
}


const mapStateToProps = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapStateToProps, {})(MessageList);
