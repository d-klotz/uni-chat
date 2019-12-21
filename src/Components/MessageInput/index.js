import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SendIcon from '@atlaskit/icon/glyph/send';
import EmojiAddIcon from '@atlaskit/icon/glyph/emoji-add';
import EditorAttachmentIcon from '@atlaskit/icon/glyph/editor/attachment';
import ProgressBar from '@atlaskit/progress-bar';
import EmojiDrawer from '../EmojiDrawer';
import Button from '../Button';
import HiddenContent from '../HiddenContent';
import Modal from '../../Components/Modal';

import 'emoji-mart/css/emoji-mart.css'
import * as theme from '../../Styles/theme';
import { Container, Input, ImagePreviewBorder } from './styles';

 const MessageInput = (props) => {

  const [value, setValue] = useState({type: 'text', value: ''});
  const [showEmojiDrawer, setShowEmojiDrawer] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  let chatInput;

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      props.clicked(value);
      setValue({type: 'text', value: ''});
      setShowEmojiDrawer(false);
    }
  }

  const clicked = () => {
    props.clicked(value);
    setValue({type: 'text', value: ''});
    setShowEmojiDrawer(false);
  }

  const valueChanged = (event) => {
    setValue({ type: 'text', value: event.target.value });
  }

  const handleEmojiDrawer = () => {
    setShowEmojiDrawer(previous => !previous);
  }

  const handleAddEmoji = (emoji) => {
    setValue(previous => { return { type: 'text', value: `${previous.value} ${emoji.native}` }});
    setShowEmojiDrawer(false);
    chatInput.focus();
  }

  const emojiContainer = (
    <EmojiDrawer onEmojiAdd={handleAddEmoji}  mouseLeaved={() => setShowEmojiDrawer(false)}/>
  )

  const handleFileChanged = async (file) => {
    setImage(file);
    let reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    }
    reader.readAsDataURL(file);
    setModalIsOpen(true);
  }

  const handleChooseFile = () => {
    document.getElementById("upfile").click();
  }

  const uploadImage = () => {
    setIsImageUploading(true);
    const formData = new FormData();
    formData.append('file', image);
    axios.post('https://api.anonymousfiles.io/', formData)
    .then(response => {
      const imgUrl = response.data.name.replace(/\s+/g, '_');
      props.clicked({ type: 'image', value: `https://anonymousfiles.io/f/${imgUrl}`});
      setIsImageUploading(false);
      setModalIsOpen(false);
    });
  }

  return (
    <Container>
      {modalIsOpen && (
        <Modal 
          show={modalIsOpen} 
          modalClosed={() => setModalIsOpen(false)}
          width="500px"
          height="300px"
          title="Your image preview"
          secondaryButton="Cancel"
          primaryButton="Upload"
          secondaryButtonClicked={() => setModalIsOpen(false)}
          primaryButtonClicked={() => uploadImage()}>
          <ImagePreviewBorder>
            <img id="test" src={imagePreview} alt="This is a preview" height="210"/>
          </ImagePreviewBorder>
          {isImageUploading && <ProgressBar isIndeterminate />}
        </Modal>
      )}
      <span>
        <div onClick={() => handleChooseFile()}>
          <EditorAttachmentIcon primaryColor={theme[props.themeName].color2}/>
          <HiddenContent>
            <input 
              id="upfile" 
              type="file" 
              accept="image/*" 
              onChange={e => handleFileChanged(e.target.files[0])}>
            </input>}/>
          </HiddenContent>
        </div>
      </span>
      
      <span>
        <div onClick={() => handleEmojiDrawer()}>
          <EmojiAddIcon primaryColor={theme[props.themeName].color2}/>
        </div>
        {showEmojiDrawer && emojiContainer}
      </span>
      <Input
        ref={(input) => { chatInput = input }}
        placeholder={props.placeholder} 
        onKeyPress={keyPressed} 
        value={value.value}
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
    themeName: state.user.themeName
  }
}

export default connect(mapStateToProps, null)(MessageInput);
