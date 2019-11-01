import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 

import Sidebar from '../../Components/Sidebar';
import MessageList from '../../Components/MessageList';
import MessageInput from '../../Components/MessageInput';
import SidebarContainer from '../../Containers/SidebarContainer';
import formatDate from '../../utils'
import { Container, Content, MessagesContainer } from './styles';

const Chat = ({ isAuthenticated }) => {
  
  const [messages, setMessages] = useState([]);

  let chatContainer = <Redirect to="/"/>;

  useEffect(() => {
    setMessages([{
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
    }]);
  }, []);  

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, {
      emiter: 'Monica',
      timestamp: formatDate(new Date()),
      content: newMessage
    }]);
  }

  if (isAuthenticated) {
    chatContainer = (
      <Container>
        <Sidebar color="#222831">
          <SidebarContainer />
        </Sidebar>
        <Content>
          <MessagesContainer>
            <MessageList messages={messages}/>
          </MessagesContainer>
          <MessageInput 
            placeholder="Write your message..." 
            buttonColor="#393e46"
            clicked={newMessage => handleSendMessage(newMessage)}/>
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
