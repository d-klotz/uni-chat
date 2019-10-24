import React from 'react';

import Avatar from '@atlaskit/avatar';
import { Container, AvatarStyle, UserName } from './styles';

const User = (props) => {
  return (
    <Container>
      <AvatarStyle>
        <Avatar name="large" size="large" presence="online" />
      </AvatarStyle>
      <UserName>{props.username}</UserName>
    </Container>
  );
}

export default User;
