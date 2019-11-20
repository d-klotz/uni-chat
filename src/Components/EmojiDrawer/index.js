import React from 'react';
import { Picker } from 'emoji-mart'

import { Container } from './styles';

const EmojiDrawer = (props) => {
  return (
    <Container onMouseLeave={props.mouseLeaved}>
      <Picker onSelect={(emoji) => props.onEmojiAdd(emoji)} />
    </Container>
  )
}

export default EmojiDrawer;