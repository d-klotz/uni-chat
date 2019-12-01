import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  groups: [],
  defaultGroup: null
};


const setGroups = (state, action) => {
  return updateObject(state, { groups: action.groups });
}

const setDefaultGroup = (state, action) => {
  return updateObject(state, { defaultGroup: action.defaultGroup });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.SET_GROUPS:
          return setGroups(state, action);
      case actionTypes.SET_DEFAULT_GROUP:
          return setDefaultGroup(state, action);
      default:
          return state;
  }
};

export default reducer;
