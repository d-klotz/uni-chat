import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socketio from 'socket.io-client';
import Sidebar from '../../Components/Sidebar';
import MessageList from '../../Components/MessageList';
import MessageInput from '../../Components/MessageInput';
import SidebarContainer from '../../Containers/SidebarContainer';
import formatDate from '../../utils'
import { Container, Content, MessagesContainer } from './styles';

const Chat = ({ isAuthenticated }) => {
  
  const [messages, setMessages] = useState([]);

  const userId = localStorage.getItem('userId');
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { userId }
  }), [userId]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages(previous => [...previous, message])
    });

    // return () => {
    //   socket.off();
    // }
   }, [socket]);

  useEffect(() => {
    socket.emit('join', userId);
  }, [socket, userId]);


  let chatContainer = <Redirect to="/"/>; 

  const handleSendMessage = (newMessage) => {
    console.log(userId);
    const message = {
      emitter: userId,
      room: 'general',
      timestamp: formatDate(new Date()),
      content: newMessage,
    };
    socket.emit('createMessage', message);
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
