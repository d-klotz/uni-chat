import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as theme from '../../Styles/theme';

const initialState = {
    userId: null,
    userName: null,
    email: null,
    photo: null,
    theme: theme.darkTheme
};

const setOnlineUser = (state, action) => {
  return updateObject(state, {
      userId: action.id,
      username: action.username,
      email: action.email,
      photo: action.photo
  });
}

const setUserTheme = (state, action) => {
  return updateObject(state, {
    theme: action.theme
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.SET_ONLINE_USER:
        return setOnlineUser(state, action);
      case actionTypes.SET_USER_THEME:
        return setUserTheme(state, action);
      default:
          return state;
  }
};

export default reducer;