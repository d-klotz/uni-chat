import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Select from '@atlaskit/select';
import { Field } from '@atlaskit/form';
import Spinner from '@atlaskit/spinner';

import api from '../../services/api';
import User from '../../Components/User';
import OnlineUsers from '../../Components/OnlineUsers';
import { Container, ContainerItem, GroupListContainer } from './styles';

const SidebarContainer = ({ username, onlineUsers }) => {

  const userId = localStorage.getItem('userId');

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    api.get(`/users/${userId}/groups`)
      .then(res => {
        const refinedGroups = res.data.groups.map(group => {
          return { label: group.name, value: group._id }
        });
        setGroups(refinedGroups);
      });
  }, [userId]);

  let fetchedgroups = <Spinner size="medium"/>
  if (groups.length > 0) {
    fetchedgroups = (
      <GroupListContainer>
        <Field
          id="user-groups"
          name="user-groups"
          defaultValue={groups[0]}
        >
          {({ fieldProps }) => (
            <Select
              {...fieldProps}
              options={groups}
              placeholder="Your Groups"
            />
          )}
        </Field>
      </GroupListContainer>
    )
  }

  return (
    <Container>
      <ContainerItem>
        <User username={username}/>
        {fetchedgroups}
        <OnlineUsers onlineUsers={onlineUsers} />
      </ContainerItem>
    </Container>
  );
}


const mapStateToProps = state => {
  return {
      username: state.user.username
  }
}

export default connect(mapStateToProps, {})(SidebarContainer);
