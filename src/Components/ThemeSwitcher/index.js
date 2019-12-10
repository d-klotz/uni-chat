import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import { Container, SwitchButton } from './styles';

const ThemeSwitcher = ({onSwitchTheme, themeName, userId}) => {

  const toggleTheme = () => {
    onSwitchTheme(userId, themeName === 'darkTheme' ? 'lightTheme' : 'darkTheme');
  }

  return (
    <Container>
      <SwitchButton>
        <input type="checkbox" id="switch" onChange={() => toggleTheme()}/>
        <label htmlFor="switch">Toggle</label>
      </SwitchButton>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    themeName: state.user.themeName
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onSwitchTheme: (userId, themeName) => dispatch(actions.switchTheme(userId, themeName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher);
