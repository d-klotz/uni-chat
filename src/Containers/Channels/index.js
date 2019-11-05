import React from 'react';

import { Container, List } from './styles';

const Channels = ({ channels, selectedChannel }) => {
  return (
    <Container>
      <p>Channels</p>
      <ul>
        {channels.map((channel, index) => <List selectedChannel={channel.id === selectedChannel} key={index}># {channel.name}</List>)}
      </ul>

      <ul>
        <li>+ Channel</li>
      </ul>
      
    </Container>
  );
}

export default Channels;
