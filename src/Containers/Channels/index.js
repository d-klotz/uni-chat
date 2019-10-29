import React from 'react';

import { Container } from './styles';

const Channels = ({ channels }) => {
  return (
    <Container>
      <p>Channels</p>
      <ul>
        {channels.map(channel => <li># {channel}</li>)}
      </ul>

      <ul>
        <li>+ Channel</li>
      </ul>
      
    </Container>
  );
}

export default Channels;
