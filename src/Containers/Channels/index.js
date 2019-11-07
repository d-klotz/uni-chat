import React from 'react';

import Spinner from '@atlaskit/spinner';
import { Container, List } from './styles';

const Channels = (props) => {

  return props.isLoading ? <Spinner /> : (
    <Container>
      <p onClick={() => props.onChannelsListing()}>Channels</p>
      <ul>
        {props.channels.map((channel, index) => (
          <List 
            selectedChannel={channel.id === props.selectedChannel} 
            key={index}
            onClick={() => props.onChannelSelection(channel.id)}># {channel.name}
          </List>)
        )}
      </ul>
      <ul>
        <li onClick={() => props.onChannelCreate()}>+ Create a channel</li>
      </ul>      
    </Container>
  )
    
}

export default Channels;
