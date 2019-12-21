import React from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import Backdrop from '../Backdrop';
import { Container, Title, Footer } from './styles';

const Modal = (props) => {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <Container width={props.width} height={props.height}>
        <Title>{props.title}</Title>
        {props.children}
        <Footer>
          <ButtonGroup>
            <Button appearance="link" onClick={props.secondaryButtonClicked}>{props.secondaryButton}</Button>
            <Button appearance="primary" onClick={props.primaryButtonClicked}>{props.primaryButton}</Button>
          </ButtonGroup>
        </Footer>
      </Container>
    </>
  );
}
export default Modal;
