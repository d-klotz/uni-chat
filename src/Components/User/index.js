import React from 'react';

import Avatar from '@atlaskit/avatar';
import { Container, AvatarStyle, UserName } from './styles';

const User = (props) => {
  return (
    <Container>
      <AvatarStyle>
        <Avatar name="large" size="large" presence="online" src={props.username ? `https://eu.ui-avatars.com/api/?name=${props.username.substring(0, 2)}` : null}/>
      </AvatarStyle>
      <UserName>{props.username}</UserName>
    </Container>
  );
}

export default User;
