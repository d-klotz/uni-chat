import React from 'react';

import { Container } from './styles';

const Button = (props) => {
  return (
    <Container color={props.color} onClick={props.clicked}>
      {props.children}
    </Container>
  );
}

export default Button;
