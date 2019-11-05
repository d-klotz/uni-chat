import React, { useEffect, useState } from 'react';

import Select from '@atlaskit/select';
import SettingsIcon from '@atlaskit/icon/glyph/settings';

import User from '../../Components/User';
import Channels from '../Channels';
import api from '../../services/api';
import { Container, ContainerItem } from './styles';

export default function SidebarContainer() {

  const [channels, setChannels] = useState([]);
  const groupId = 1;
  const selectedChannel = 1;

  useEffect(() => {
    fetchChannels(groupId);
  }, [groupId]);
  
  const fetchChannels = async (groupId) => {
    await api.get(`/groups/${groupId}/channels`)
      .then(res => res.data ? setChannels(res.data.channels) : setChannels([]))
      .catch(err => console.log(err));
  }

  return (
    <Container>
      <ContainerItem>
        <User username="Daniel Klotz"/>
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
        <Channels channels={channels} selectedChannel={selectedChannel}/>
      </ContainerItem>
      
      <ContainerItem>
      <p>
        <SettingsIcon size="large"/>
      </p>
      </ContainerItem>
    </Container>
  );
}
