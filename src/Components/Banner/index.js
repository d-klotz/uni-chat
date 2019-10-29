import React from 'react';

import { Container } from './styles';

const Banner = (props) => {
  return (
    <Container color={props.color}>
      {props.children}
    </Container>
  );
}

export default Banner;
