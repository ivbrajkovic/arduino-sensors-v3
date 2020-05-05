/**
 * UI store actions
 */

import {
  SET_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  SET_DARK_THEME,
  SET_DEV_MENU
} from '../../types';

const unknownError = {
  code: 'unknown_error',
  message: 'Unknown error',
  details: []
};

// Loading
export const setLoadingAction = () => ({ type: SET_LOADING, payload: true });

export const clearLoadingAction = () => ({ type: SET_LOADING, payload: false });

// error
export const setErrorAction = error => ({ type: SET_ERROR, payload: error });

export const setUnknownErrorAction = () => ({
  type: SET_ERROR,
  payload: unknownError
});

export const clearErrorsAction = () => ({ type: CLEAR_ERROR });

// theme
export const setDarkThemeAction = () => ({
  type: SET_DARK_THEME,
  payload: true
});

export const clearDarkThemeAction = () => ({
  type: SET_DARK_THEME,
  payload: false
});

// developer menu
export const setDevMenuAction = () => ({ type: SET_DEV_MENU, payload: true });

export const clearDevMenuAction = () => ({
  type: SET_DEV_MENU,
  payload: false
});
