import React from 'react';

import { Container } from './styles';

 const HiddenContent = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
}
export default HiddenContent;
