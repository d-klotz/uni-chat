import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const setGroups = (groups) => {
  return {
    type: actionTypes.SET_GROUPS,
    groups: groups
  };
}

export const setDefaultGroup = (groups) => {
  const defaultGroup = groups.filter(group => group.name === 'Unichat community');
  return {
    type: actionTypes.SET_DEFAULT_GROUP,
    defaultGroup: defaultGroup[0]
  };
}

export const fetchGroups = () => {
  return async dispatch => {
      return await api.get(`/groups`)
      .then(response => {
          dispatch(setGroups(response.data.groups));
          dispatch(setDefaultGroup(response.data.groups));
      })
      .catch(error => {console.log(error)});
  };
}