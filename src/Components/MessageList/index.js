import React from 'react';
import { connect } from 'react-redux';
import { SlideInUp } from 'animate-css-styled-components';

import { Container, ListItem, MessageContent, TimeLayout, MessageTitle } from './styles';

const MessageList = ({username, messages}) => {

  const me = username;

  return (
    <Container>
      {messages.map((message, index) => (
        <ListItem key={index} myMessage={message.emitter === me}>
          <SlideInUp duration="0.5s">
            <MessageTitle>{message.emitter} <TimeLayout>{message.timestamp}</TimeLayout></MessageTitle>
            <MessageContent myMessage={message.emitter === me}>
              {message.content}
            </MessageContent>
        </SlideInUp>
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
