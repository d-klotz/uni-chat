import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import * as actions from './store/actions'
import GlobalStyle from './Styles/global';

import Routes from './routes';

const App = ({ isAuthenticated, onTryAutoSignup, theme }) =>  {

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <ThemeProvider theme={theme}>
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
    theme: state.user.theme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
