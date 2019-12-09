import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import { Container, SwitchButton } from './styles';
import * as theme from '../../Styles/theme';

const ThemeSwitcher = ({onSwitchTheme}) => {

  const [choosenTheme, setChoosenTheme] = useState(theme.lightTheme);

  const toggleTheme = () => {
    setChoosenTheme(previous => previous === theme.lightTheme ? theme.darkTheme : theme.lightTheme);
    onSwitchTheme(choosenTheme);
  }

  return (
    <Container>
      <SwitchButton>
        <input type="checkbox" id="switch" onChange={() => toggleTheme()}/>
        <label for="switch">Toggle</label>
      </SwitchButton>
    </Container>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      onSwitchTheme: (theme) => dispatch(actions.switchTheme(theme)),
  }
}

export default connect(null, mapDispatchToProps)(ThemeSwitcher);
