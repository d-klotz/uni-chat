import React from 'react';

import { Container } from './styles';

const Backdrop = (props) => (
  props.show ? <Container onClick={props.clicked}></Container> : null
);

export default Backdrop;
