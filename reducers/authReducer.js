import {LOGIN, LOGOUT} from '../constants/auth';

const initialState = {
  accessToken: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
      };
    default:
      return state;
  }
};
export default authReducer;
