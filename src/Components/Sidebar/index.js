import React from 'react';

import CustomDrawer from '../Drawer';
import { Container } from './styles';

const Sidebar = (props) => {
  return (
    <Container color={props.color}>
      <CustomDrawer>
        {props.children}
      </CustomDrawer>
      <nav>
        {props.children}
      </nav>
    </Container>
  );
}

export default Sidebar;
