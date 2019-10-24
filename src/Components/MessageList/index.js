import React from 'react';

import { Container, ListItem, MessageContent, TimeLayout, MessageTitle } from './styles';

const MessageList = (props) => {
  return (
    <Container>
      {props.messages.map((message, index) => (
        <ListItem key={index}>
          <MessageTitle>{message.emiter} <TimeLayout>{message.timestamp}</TimeLayout></MessageTitle>
          <MessageContent myMessage={message.emiter === 'Monica'}>
            {message.content}
          </MessageContent>
        </ListItem>
      ) )}
    </Container>
  );
}

export default MessageList;
