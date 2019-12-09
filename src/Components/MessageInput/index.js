import React, { useState } from 'react';
import { connect } from 'react-redux';

import SendIcon from '@atlaskit/icon/glyph/send';
import EmojiAddIcon from '@atlaskit/icon/glyph/emoji-add';
import 'emoji-mart/css/emoji-mart.css'
import EmojiDrawer from '../EmojiDrawer';

import Button from '../Button';
import { Container, Input } from './styles';

 const MessageInput = (props) => {

  const [value, setValue] = useState('');
  const [showEmojiDrawer, setShowEmojiDrawer] = useState(false);

  let chatInput;

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      props.clicked(value);
      setValue('');
      setShowEmojiDrawer(false);
    }
  }

  const clicked = () => {
    props.clicked(value);
    setValue('');
    setShowEmojiDrawer(false);
  }

  const valueChanged = (event) => {
    setValue(event.target.value);
  }

  const handleEmojiDrawer = () => {
    setShowEmojiDrawer(previous => !previous);
  }

  const handleAddEmoji = (emoji) => {
    setValue(previous => `${previous} ${emoji.native}`);
    setShowEmojiDrawer(false);
    chatInput.focus();
  }

  const emojiContainer = (
    <EmojiDrawer onEmojiAdd={handleAddEmoji}  mouseLeaved={() => setShowEmojiDrawer(false)}/>
  )

  return (
    <Container>
      <span>
        <div onClick={() => handleEmojiDrawer()}>
          <EmojiAddIcon primaryColor={props.theme.color2}/>
        </div>
        {showEmojiDrawer && emojiContainer}
      </span>
      <Input
        ref={(input) => { chatInput = input }}
        placeholder={props.placeholder} 
        onKeyPress={keyPressed} 
        value={value}
        onChange={e => valueChanged(e)}
      />
      <Button clicked={() => clicked()}>
        <SendIcon />
      </Button>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.user.theme
  }
}

export default connect(mapStateToProps, null)(MessageInput);
