import * as actionTypes from './actionTypes';
import api from '../../services/api.js';

export const setOnlineUser = (id, username, email, photo, themeName) => {
  return {
      type: actionTypes.SET_ONLINE_USER,
      id,
      username,
      email,
      photo,
      themeName
  }
}

export const setUserTheme = (themeName) => {
  return {
    type: actionTypes.SET_USER_THEME,
    themeName
  }
}

export const fetchUserData = (userId) => {
  return async dispatch => {
    return await api.get(`/users/${userId}`)
      .then(response => {
        dispatch(setOnlineUser(
          response.data.user._id,
          response.data.user.username,
          response.data.user.email,
          response.data.user.photo,
          response.data.user.themeName
        ));
      })
      .catch(error => { console.log(error) });
  };
}

export const switchTheme = (userId, themeName) => {
  return async dispatch => {
    dispatch(setUserTheme(themeName));
    return await api.patch(`/users/${userId}`, { themeName: themeName });
  }
}