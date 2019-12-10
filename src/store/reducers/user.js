import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    userName: null,
    email: null,
    photo: null,
    themeName: 'darkTheme'
};

const setOnlineUser = (state, action) => {
  return updateObject(state, {
      userId: action.id,
      username: action.username,
      email: action.email,
      photo: action.photo,
      themeName: action.themeName
  });
}

const setUserTheme = (state, action) => {
  return updateObject(state, {
    themeName: action.themeName
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