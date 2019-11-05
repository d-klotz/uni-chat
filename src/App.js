import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from './store/actions'
import GlobalStyle from './Styles/global';

import Routes from './routes';

const App = ({ isAuthenticated, onTryAutoSignup }) =>  {

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <div>
      <GlobalStyle showBackgroundImage={isAuthenticated}/>
      <Routes />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
