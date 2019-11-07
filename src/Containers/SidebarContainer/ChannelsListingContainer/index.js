import React from 'react';

import Spinner from '@atlaskit/spinner';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';

import { Container } from './styles';

const ChannelListingContainer = ({ channels, isLoading, onEnterChannel }) => {
  return (
    <Container>
      {isLoading ? <span><Spinner size="medium"/></span> : (
        <ul>
          {channels.map(channel => <li key={channel.id}>
            <div>
              {channel.name}
              <span onClick={() => onEnterChannel(channel.id)}>
                <SignInIcon />
              </span>
            </div>
            <span>{channel.description}</span></li>)}
        </ul>
      )}
    </Container>
  );
}

export default ChannelListingContainer;
