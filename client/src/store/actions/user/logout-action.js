/**
 * User logout actions
 */

import { LOGOUT_USER } from '../../types';

// Logout user and update store
export const logoutAction = () => dispatch => {
  // Remove token from storage
  window.localStorage.removeItem('token');

  // Remove user from store
  dispatch({ type: LOGOUT_USER });
};

export default logoutAction;
