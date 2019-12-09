import React from 'react';

import { Container } from './styles';

const Button = (props) => {
  return (
    <Container onClick={props.clicked}>
      {props.children}
    </Container>
  );
}

export default Button;
