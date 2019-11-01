import React from 'react';

import Select from '@atlaskit/select';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import User from '../../Components/User';
import Channels from '../Channels';
import { Container, ContainerItem } from './styles';

export default function SidebarContainer() {

  const channels = ['general', 'reactJs', 'java', 'random']

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
        <Channels channels={channels}/>
      </ContainerItem>
      
      <ContainerItem>
      <p>
        <SettingsIcon size="large"/>
      </p>
      </ContainerItem>
    </Container>
  );
}
