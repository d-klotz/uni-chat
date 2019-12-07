import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SlideInUp } from 'animate-css-styled-components';

import UserDetailsCard from '../UserDetailsCard';

import { 
  Container, 
  ListItem, 
  MessageContent, 
  TimeLayout, 
  MessageTitle, 
  UsernameLayout } from './styles';

const MessageList = ({username, messages}) => {

  const me = username;
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [selectedUser, setSelectecUser] = useState("");
  const [modalPositionAxeY, setModalPositionAxeY] = useState(0);
  const [modalPositionAxeX, setModalPositionAxeX] = useState(0);

  const handleShowUserDetails = (show, userId, e) => {
    setModalPositionAxeY(e.clientY);
    setModalPositionAxeX(e.clientX);
    setIsUserDetailsOpen(show);
    setSelectecUser(userId);
  }

  const canAgglutinateMessage = (indexFirstMessage, previousMessage, actuallMessage) => {
    return !isFirstMessage(indexFirstMessage) && previousMessage.emitter === actuallMessage.emitter
      && previousMessage.timestamp === actuallMessage.timestamp;
  }

  const isFirstMessage = (indexFirstMessage) => {
    return indexFirstMessage === 0;
  }

  return (
    <Container>
      {isUserDetailsOpen && (
        <UserDetailsCard
          show={isUserDetailsOpen}
          modalPositionAxeY={modalPositionAxeY}
          modalPositionAxeX={modalPositionAxeX}
          modalClosed={(e) => setIsUserDetailsOpen(false)} 
          userId={selectedUser}/>
      )}
      {messages.map((message, index) => (
        <ListItem key={index} myMessage={message.emitter === me}>
          <SlideInUp duration="0.5s">
            {canAgglutinateMessage(index, messages[index === 0 ? 0 : index - 1], message) ? null : (
                <MessageTitle>
                  <UsernameLayout onClick={(e) => handleShowUserDetails(true, message.emitterId, e)}>
                    {message.emitter}
                  </UsernameLayout>
                  <TimeLayout>{message.timestamp}</TimeLayout>
                </MessageTitle>
              )}
            <MessageContent myMessage={message.emitter === me}>
              {message.content}
            </MessageContent>
          </SlideInUp>
        </ListItem>
      ))}
    </Container>
  );
}


const mapStateToProps = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapStateToProps, {})(MessageList);
