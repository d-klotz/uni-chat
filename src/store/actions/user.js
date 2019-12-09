import * as actionTypes from './actionTypes';
import api from '../../services/api.js';

export const setOnlineUser = (id, username, email, photo) => {
  return {
      type: actionTypes.SET_ONLINE_USER,
      id,
      username,
      email,
      photo
  }
}

export const setUserTheme = (theme) => {
  return {
    type: actionTypes.SET_USER_THEME,
    theme
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
          response.data.photo
        ));
      })
      .catch(error => { console.log(error) });
  };
}

export const switchTheme = (theme) => {
  return dispatch => dispatch(setUserTheme(theme));
}