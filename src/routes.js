import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './Containers/Auth';
import About from './Containers/About';
import Chat from './Containers/Chat';

const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Auth}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/about" component={About}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;