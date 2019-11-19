import React, { useState } from 'react';

import Drawer from '@atlaskit/drawer';
import MenuIcon from '@atlaskit/icon/glyph/menu';

import { Container, DrawerContainer } from './styles';

const CustomDrawer = (props) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(previous => !previous);
  }

  const closeDrawer = () => {
    setIsDrawerOpen(previous => !previous);
  } 

  return (
    <Container>
      <div onClick={() => openDrawer()}>
        <MenuIcon size="large" />
      </div>
      <Drawer
        onClose={closeDrawer}
        isOpen={isDrawerOpen}
        width="narrow">
        <DrawerContainer>
          {props.children}
        </DrawerContainer>
      </Drawer>
    </Container>
  );
}

export default CustomDrawer;
