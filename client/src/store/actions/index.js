/**
 * Export default store actions
 */

// User actions
import loginAction from './user/login-action';
import logoutAction from './user/logout-action';
import signupAction from './user/signup-action';
import checkTokenAction from './user/check-token-action';

// Ui actions
import {
  setErrorAction,
  clearErrorsAction,
  setDarkThemeAction,
  clearDarkThemeAction,
  setDevMenuAction,
  clearDevMenuAction
} from './ui';

export {
  loginAction,
  logoutAction,
  signupAction,
  checkTokenAction,
  setErrorAction,
  clearErrorsAction,
  setDarkThemeAction,
  clearDarkThemeAction,
  setDevMenuAction,
  clearDevMenuAction
};
