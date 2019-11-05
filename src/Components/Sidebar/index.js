import React from 'react';

import { Container } from './styles';

const Sidebar = (props) => {
  return (
    <Container color={props.color}>
      {props.children}
    </Container>
  );
}

export default Sidebar;
