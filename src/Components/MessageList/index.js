import React from 'react';

import { Container, ListItem, MessageContent, TimeLayout, MessageTitle } from './styles';

const MessageList = (props) => {

  const me = 'Monica';

  return (
    <Container>
      {props.messages.map((message, index) => (
        <ListItem key={index} myMessage={message.emiter === me}>
          <MessageTitle>{message.emiter} <TimeLayout>{message.timestamp}</TimeLayout></MessageTitle>
          <MessageContent myMessage={message.emiter === me}>
            {message.content}
          </MessageContent>
        </ListItem>
      ) )}
    </Container>
  );
}

export default MessageList;
