import React, { useState } from 'react';
import SendIcon from '@atlaskit/icon/glyph/send';
import Button from '../Button';
import { Container, Input } from './styles';

 const MessageInput = (props) => {

  const [value, setValue] = useState('');

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      props.clicked(value);
      setValue('');
    }
  }

  const clicked = () => {
    props.clicked(value);
    setValue('');
  }

  const valueChanged = (event) => {
    setValue(event.target.value);
  }

  return (
    <Container>
      <Input 
        placeholder={props.placeholder} 
        onKeyPress={keyPressed} 
        value={value}
        onChange={e => valueChanged(e)}
      />
      <Button color={props.buttonColor} clicked={() => clicked()}>
        <SendIcon />
      </Button>
    </Container>
  );
}

export default MessageInput;
