/**
 * UI store actions
 */

import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_DARK_THEME,
  CLEAR_DARK_THEME,
  SET_DEV_MENU,
  CLEAR_DEV_MENU
} from '../../types';

// error
export const setErrorAction = error => dispatch =>
  dispatch({ type: SET_ERROR, payload: error });

export const clearErrorsAction = () => dispatch =>
  dispatch({ type: CLEAR_ERROR });

// theme
export const setDarkThemeAction = () => dispatch =>
  dispatch({ type: SET_DARK_THEME });

export const clearDarkThemeAction = () => dispatch =>
  dispatch({ type: CLEAR_DARK_THEME });

// developer menu
export const setDevMenuAction = () => dispatch =>
  dispatch({ type: SET_DEV_MENU });

export const clearDevMenuAction = () => dispatch =>
  dispatch({ type: CLEAR_DEV_MENU });
