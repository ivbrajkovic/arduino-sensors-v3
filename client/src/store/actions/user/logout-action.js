/**
 * User logout actions
 */

import { LOGOUT_USER } from '../../types';

// Logout user and update store
export const logoutAction = () => {
  // Remove token from storage
  window.localStorage.removeItem('token');

  // Remove user from store
  return { type: LOGOUT_USER };
};

export default logoutAction;
