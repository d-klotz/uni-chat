import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 

import Sidebar from '../../Components/Sidebar';
import User from '../../Components/User';
import MessageList from '../../Components/MessageList';
import { Container, Content, MessageInput, MessagesContainer } from './styles';

const Chat = ({ isAuthenticated }) => {

  let chatContainer = <Redirect to="/"/>;

  let messages = [{
    emiter: 'Monica',
    timestamp: '10:30 a.m',
    content: 'Hello Alex'
  },
  {
    emiter: 'Alex',
    timestamp: '10:31 a.m',
    content: 'Hi Monica'
  },
  {
    emiter: 'Alex',
    timestamp: '10:31 a.m',
    content: 'How are you doing?'
  },
  {
    emiter: 'Monica',
    timestamp: '10:35 a.m',
    content: 'Im doing great, what about you? Ready for the party?'
  }];

  if (isAuthenticated) {
    chatContainer = (
      <Container>
        <Sidebar color="#222831">
          <User username="Daniel klotz"/>
        </Sidebar>
        <Content>
          <MessagesContainer>
            <MessageList messages={messages}/>
          </MessagesContainer>
          <MessageInput />
        </Content>
      </Container>
    )
  }

  return chatContainer;
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps, {})(Chat);
