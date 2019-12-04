import React, { useState, useEffect } from 'react';
import PresenceActiveIcon from '@atlaskit/icon/glyph/presence-active';
import api from '../../services/api';

import { Container, UserContainer, AvatarPhoto } from './styles';

const OnlineUsers = ({ onlineUsers }) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await api.get(`/users`);
      const users = response.data.users.map(user => {
        return {
          username: user.username,
          photo: `https://eu.ui-avatars.com/api/?name=${user.username.substring(0, 2)}`,
          online: false
        }
      });
      setAllUsers(defineUsersStatus(users, onlineUsers));
    }
    fetchAllUsers();
  }, [onlineUsers]);

  /**
   * Merges both users lists, returning a list with the users status inside the chat
   * @param allUsers List of all users inside a group 
   * @param onlineUsersList List of online users inside a group
   */
  const defineUsersStatus = (allUsers, onlineUsersList) => {
    return [...allUsers.map(offlineUser => {
      onlineUsersList.map(onlineUser => {
        if (offlineUser.username === onlineUser.username) {
          offlineUser.online = true;
        }  
        return offlineUser;
      })
      return offlineUser;
    })];
  }

  const users = allUsers.map(user => {
    return (
      <UserContainer key={user.username}>
        <span>
          <PresenceActiveIcon
            size="small"
            primaryColor={user.online ? 'green' : 'grey'} />
        </span>
        <AvatarPhoto photo={user.photo} />
        <p>{user.username}</p>
      </UserContainer>
    )
  });

  return (
    <Container>
      <h3>FRIENDS</h3>
      <div>{users}</div>
    </Container>
  );
}

export default OnlineUsers;
