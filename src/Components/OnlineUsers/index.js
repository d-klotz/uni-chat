import React from 'react';

import AvatarGroup from '@atlaskit/avatar-group';

import { Container } from './styles';

const OnlineUsers = ({ onlineUsers }) => {
  
  return (
    <Container>
      <p>Online Users</p>
      <div>
        <AvatarGroup
          appearance="stack"
          onAvatarClick={console.log}
          data={onlineUsers}
          size="large"
        />
      </div>
    </Container>
  );
}

export default OnlineUsers;
