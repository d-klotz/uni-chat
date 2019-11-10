import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Select from '@atlaskit/select';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import SettingsIcon from '@atlaskit/icon/glyph/settings';

import User from '../../Components/User';
import Channels from '../Channels';
import api from '../../services/api';
import { Container, ContainerItem } from './styles';
import ChannelsListingContainer from './ChannelsListingContainer';

const fetchPinnedChannels = async (groupId, user_id) => {
  return await api.get(`/groups/${groupId}/channels/pinned`, {
    headers: { user_id }
  });
}

const SidebarContainer = ({username}) => {

  const [channels, setChannels] = useState([]);
  const [pinnedChannels, setPinnedChannels] = useState([]);
  const [isChannelsLoading, setIsChannelsLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const groupId = 1;

  const user_id = localStorage.getItem('userId') 

  useEffect(() => {
    fetchPinnedChannels(groupId , user_id)    
    .then(res => {
      setPinnedChannels(res.data.channels);
    })
    .catch(() => {
      setPinnedChannels([])
    });
  }, [user_id]);
  
  const fetchChannels = async (groupId) => {
    setIsChannelsLoading(true);
    await api.get(`/groups/${groupId}/channels`)
      .then(res => {
        setChannels(res.data.channels);
        setIsChannelsLoading(false);
      })
      .catch(() => {
        setIsChannelsLoading(false);
        setChannels([])
      });
  }

  const handleChannelSelection = (channel) => {
    setSelectedChannel(channel);
  }

  const handleChannelsListing = () => {
    fetchChannels(groupId);
    setIsOpen(true);
  }

  const handleCreateChannel = () => {
    alert('criando novo canal');
  }

  const handleChannelListingModalClose = () => {
    setIsOpen(false);
  }

  const handleEnterChannel = (channelId) => {
    setPinnedChannels(previous => [...previous, channels.find(channel => channel.id === channelId)])
  }

  return (
    <Container>
      <ModalTransition>
        {isOpen && (
          <Modal heading="All Channels" onClose={handleChannelListingModalClose}>
            <ChannelsListingContainer 
              channels={channels}
              isLoading={isChannelsLoading}
              onEnterChannel={handleEnterChannel}/>
          </Modal>)}
      </ModalTransition>
      <ContainerItem>
        <User username={username}/>
        <Select
          className="single-select"
          classNamePrefix="react-select"
          options={[
            { label: 'Tech Berlin', value: '2151214' },
            { label: 'Finances in Lisboa', value: '53545' },
            { label: 'The Dev Group', value: '312313' },
          ]}
          placeholder="Your Groups"
        />
        <Channels 
          channels={pinnedChannels} 
          selectedChannel={selectedChannel} 
          onChannelSelection={handleChannelSelection}
          onChannelsListing={handleChannelsListing}
          onChannelCreate={handleCreateChannel}/>
      </ContainerItem>
      
      <ContainerItem>
      <p>
        <SettingsIcon size="large"/>
      </p>
      </ContainerItem>
    </Container>
  );
}


const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

export default connect(mapStateToProps, {})(SidebarContainer);
