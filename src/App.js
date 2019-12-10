import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import * as actions from './store/actions'
import GlobalStyle from './Styles/global';

import * as theme from './Styles/theme';

import Routes from './routes';

const App = ({ isAuthenticated, onTryAutoSignup, themeName }) =>  {

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <ThemeProvider theme={theme[themeName]}>
      <>
        <GlobalStyle showBackgroundImage={isAuthenticated}/>
        <Routes />
      </>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    themeName: state.user.themeName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
