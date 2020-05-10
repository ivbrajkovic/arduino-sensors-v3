/**
 * Export default store actions
 */

// User actions
import loginAction from './user/login-action';
import logoutAction from './user/logout-action';
import signupAction from './user/signup-action';
import tokenAction from './user/token-action';

// Ui actions
import {
  setLoadingAction,
  clearLoadingAction,
  setErrorAction,
  clearErrorsAction,
  setDarkThemeAction,
  setDevMenuAction,
  setShowAllErrors
} from './ui/ui-action';

export {
  loginAction,
  logoutAction,
  signupAction,
  tokenAction,
  setLoadingAction,
  clearLoadingAction,
  setErrorAction,
  clearErrorsAction,
  setDarkThemeAction,
  setDevMenuAction,
  setShowAllErrors
};
