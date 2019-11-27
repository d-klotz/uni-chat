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

const Chat = ({ isAuthenticated, username, onFetchUserData, onFetchGroups, defaultGroup }) => {
  
  const [userJoined, setUserJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useMemo(() => socketio(config.url.API_URL, {
    query: { username }
  }), [username]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    onFetchUserData(userId);
    onFetchGroups();
  }, [onFetchGroups, onFetchUserData]);

  useEffect(() => {
    fetchMessages(defaultGroup);
  }, [defaultGroup])

  useEffect(() => {
    socket.on('newMessage', (message) => {
      message.timestamp = formatDate(message.timestamp);
      setMessages(previous => [...previous, message]);
    });

    socket.on('onlineUsers', (retrievedUsers) => {
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
    if (!userJoined && username && defaultGroup) {
      setUserJoined(true);
      socket.emit('join', defaultGroup._id);
    }
  }, [defaultGroup, socket, userJoined, username]);

  const fetchMessages = (defaultGroup) => {
    if (defaultGroup) {
      api.get(`/messages/${defaultGroup._id}`)
        .then(res => {
          const savedMessages = res.data.map(message => {
            return {
              ...message,
              timestamp: formatDate(message.timestamp)
            };
          });
          setMessages(savedMessages.reverse());
        })
        .catch(error => console.error(error));
    }
  }


  let chatContainer = <Redirect to="/"/>; 

  const handleSendMessage = (newMessage) => {
    const message = {
      group: defaultGroup._id,
      emitter: username,
      room: 'general',
      content: newMessage,
    };
    socket.emit('createMessage', message);
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
    username: state.auth.username,
    defaultGroup: state.groups.defaultGroup
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onFetchUserData: (userId) => dispatch(actions.fetchUserData(userId)),
      onFetchGroups: () => dispatch(actions.fetchGroups())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

