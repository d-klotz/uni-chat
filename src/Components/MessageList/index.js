import React from 'react';

import { Container, ListItem, MessageContent, TimeLayout, MessageTitle } from './styles';

const MessageList = (props) => {

  const me = localStorage.getItem('userId');

  return (
    <Container>
      {props.messages.map((message, index) => (
        <ListItem key={index} myMessage={message.emitter === me}>
          <MessageTitle>{message.emitter} <TimeLayout>{message.timestamp}</TimeLayout></MessageTitle>
          <MessageContent myMessage={message.emitter === me}>
            {message.content}
          </MessageContent>
        </ListItem>
      ) )}
    </Container>
  );
}

export default MessageList;
