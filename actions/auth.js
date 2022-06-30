import {LOGOUT, LOGIN} from '../constants/auth';
export function login(accessToken) {
  return {
    type: LOGIN,
    payload: accessToken,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
