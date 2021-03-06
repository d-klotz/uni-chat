import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import authReducer from './store/reducers/auth';
import groupReducer from './store/reducers/group';
import userReducer from './store/reducers/user';

const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
  user: userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));