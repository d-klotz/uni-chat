import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socketio from 'socket.io-client';

import * as actions from '../../store/actions';
import Sidebar from '../../Components/Sidebar';
import MessageList from '../../Components/MessageList';
import MessageInput from '../../Components/MessageInput';
import SidebarContainer from '../../Containers/SidebarContainer';
import formatDate from '../../utils'
import { Container, Content, MessagesContainer } from './styles';
import { config } from '../../constants';

const Chat = ({ isAuthenticated, username, onFetchUserData }) => {
  
  const [messages, setMessages] = useState([]);  

  const socket = useMemo(() => socketio(config.url.API_URL, {
    query: { username }
  }), [username]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    onFetchUserData(userId);
  }, [onFetchUserData]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages(previous => [...previous, message]);
    });

    return () => {
      socket.off();
    }
  }, [socket]);

  useEffect(() => {
    if (username) {
      socket.emit('join', username);
    }
  }, [socket, username]);


  let chatContainer = <Redirect to="/"/>; 

  const handleSendMessage = (newMessage) => {
    const message = {
      emitter: username,
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
    isAuthenticated: state.auth.token !== null,
    username: state.auth.username
  }
}



const mapDispatchToProps = dispatch => {
  return {
      onFetchUserData: (userId) => dispatch(actions.fetchUserData(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
