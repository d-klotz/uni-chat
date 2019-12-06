import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Spinner from '@atlaskit/spinner';
import { FadeIn } from 'animate-css-styled-components';
import Backdrop from '../Backdrop';

import { Container, AvatarPhoto } from './styles';

const UserDetailsCard = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLoading(true)
    api.get(`/users/${props.userId}`)
      .then(res => {
        setUser(res.data.user);
        setIsLoading(false);
      })
      .catch(err => {
        setUser(null);
        setIsLoading(false)
      });
  }, [props.user, props.userId]);

  let content;
  if (isLoading) {
    content = <Spinner />
  } else {
    content = user ? (
      <FadeIn>
        <AvatarPhoto photo={`https://eu.ui-avatars.com/api/?name=${user.username}`}/>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </FadeIn>
    ) : <p>There is no information about this user</p>
  }

  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <Container modalPositionAxeY={props.modalPositionAxeY} modalPositionAxeX={props.modalPositionAxeX}>
        {content}
      </Container>
    </>
  );
}

export default UserDetailsCard;
