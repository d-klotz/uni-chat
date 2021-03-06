import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socketio from 'socket.io-client';
import Spinner from '@atlaskit/spinner';
import Sound from 'react-sound';

import * as actions from '../../store/actions';
import Sidebar from '../../Components/Sidebar';
import MessageList from '../../Components/MessageList';
import MessageInput from '../../Components/MessageInput';
import SidebarContainer from '../../Containers/SidebarContainer';
import LoadingScreen from '../LoadingScreen';

import { Container, Content, MessagesContainer } from './styles';
import { config } from '../../constants';
import api from '../../services/api';
import formatDate from '../../utils';
import notificationSound from '../../assets/sounds/newMessageSound.mp3';

const Chat = ({ isAuthenticated, userId, username, onFetchUserData, onFetchGroups, defaultGroup }) => {
  
  const [userJoined, setUserJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isFakeloading, setIsFakeLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(Sound.status.STOPPED);

  const socket = useMemo(() => socketio(config.url.API_URL, {
    query: { username }
  }), [username]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    onFetchUserData(userId);
    onFetchGroups();
    setIsFakeLoading(true);
  }, [onFetchGroups, onFetchUserData]);

  useEffect(() => {
    fetchMessages(defaultGroup);
  }, [defaultGroup]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      message.timestamp = formatDate(message.timestamp);
      setMessages(previous => [...previous, message]);
      setNotificationStatus(Sound.status.PLAYING);
    });

    socket.on('onlineUsers', (retrievedUsers) => {
      const users = Object.keys(retrievedUsers).map(user => {
        return {
          username: user
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
      emitterId: userId,
      emitter: username,
      room: 'general',
      content: newMessage,
    };
    socket.emit('createMessage', message);
  }

  const handleNotificationFinished = () => {
    setNotificationStatus(Sound.status.STOPPED);
  }

  const startLoading = () => {
    setTimeout(() => {
      setIsFakeLoading(false);
    }, 6000);
  }

  if (isAuthenticated) {
    startLoading();
    chatContainer = isFakeloading ? <LoadingScreen /> : (
      <Container>      
        <Sound
          url={notificationSound}
          playStatus={notificationStatus}
          playFromPosition={0}
          onFinishedPlaying={handleNotificationFinished}
        />
        <Sidebar>
          <SidebarContainer onlineUsers={onlineUsers}/>
        </Sidebar>
        <Content>
          <MessagesContainer>
            {messages.length === 0 && <Spinner />}
            {messages.length > 0 && <MessageList messages={messages}/>}
          </MessagesContainer>
          <MessageInput 
            placeholder="Write your message..."
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
    userId: state.user.userId,
    username: state.user.username,
    defaultGroup: state.group.defaultGroup
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onFetchUserData: (userId) => dispatch(actions.fetchUserData(userId)),
      onFetchGroups: () => dispatch(actions.fetchGroups())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

