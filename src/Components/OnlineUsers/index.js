import React from 'react';
import PresenceActiveIcon from '@atlaskit/icon/glyph/presence-active';

import { Container, UserContainer, AvatarPhoto } from './styles';

const OnlineUsers = ({ onlineUsers }) => {

  const users = onlineUsers.map(user => {
    return (
      <UserContainer>
        <span>
          <PresenceActiveIcon 
            size="small"
            primaryColor="green"/>
        </span>
        <AvatarPhoto photo={user.photo}/>
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
