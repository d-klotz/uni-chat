import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socketio from 'socket.io-client';
import Spinner from '@atlaskit/spinner';

import * as actions from '../../store/actions';
import Sidebar from '../../Components/Sidebar';
import MessageList from '../../Components/MessageList';
import MessageInput from '../../Components/MessageInput';
import SidebarContainer from '../../Containers/SidebarContainer';
import { Container, Content, MessagesContainer } from './styles';
import { config } from '../../constants';
import api from '../../services/api';
import formatDate from '../../utils';

const Chat = ({ isAuthenticated, username, onFetchUserData }) => {
  
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useMemo(() => socketio(config.url.API_URL, {
    query: { username }
  }), [username]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    onFetchUserData(userId);
    fetchStoredMessages();
  }, [onFetchUserData]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      message.timestamp = formatDate(message.timestamp);
      setMessages(previous => [...previous, message]);
    });

    socket.on('onlineUsers', (retrievedUsers) => {
      console.log(retrievedUsers);
      console.log(Object.keys(retrievedUsers));
      const users = Object.keys(retrievedUsers).map(user => {
        return {
          key: user,
          name: user,
          src: `https://eu.ui-avatars.com/api/?name=${user.substring(0, 2)}`,
          appearance: 'circle',
          size: 'medium',
          enableTooltip: true
        } 
      });
      setOnlineUsers(users);
    })

    return () => {
      socket.off();
    }
  }, [socket]);

  useEffect(() => {
    const groupId = '5dcfb2502ee40f4e0e1695b0';
    if (username) {
      socket.emit('join', groupId);
    }
  }, [socket, username]);


  let chatContainer = <Redirect to="/"/>; 

  const handleSendMessage = (newMessage) => {
    const message = {
      //todo: implement redux storage for groupId
      group: '5dcfb2502ee40f4e0e1695b0',
      emitter: username,
      room: 'general',
      content: newMessage,
    };
    socket.emit('createMessage', message);
  }

  const fetchStoredMessages = () => {
    //todo: implement redux storage for groupId
    const groupId = '5dcfb2502ee40f4e0e1695b0';
    api.get(`/messages/${groupId}`)
      .then(res => {
        const savedMessages = res.data.map(message => {
          return {
            ...message,
            timestamp: formatDate(message.timestamp)
          }
        });
        setMessages(savedMessages.reverse());
      })
      .catch(error => console.error(error));
  }

  if (isAuthenticated) {
    chatContainer = (
      <Container>
        <Sidebar color="#222831">
          <SidebarContainer onlineUsers={onlineUsers}/>
        </Sidebar>
        <Content>
          <MessagesContainer>
            {messages.length === 0 && <Spinner />}
            {messages.length > 0 && <MessageList messages={messages}/>}
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
