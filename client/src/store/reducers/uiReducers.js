// Ui reducers

import {
  LOGIN_USER,
  LOGOUT_USER,
  START_LOADING,
  STOP_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  CLEAR_LOADING,
  SET_DEV_MENU,
  CLEAR_DEV_MENU,
  SET_DARK_THEME,
  CLEAR_DARK_THEME
} from '../types';

const initSettings = {
  darkTheme: false,
  devMenu: false
};

const initError = {
  code: '',
  message: '',
  details: []
};

const initState = {
  loading: false,
  settings: initSettings,
  error: initError
};

const uiReducer = (state = initState, action) => {
  console.log('uiReducer -> action.type', action.type);

  switch (action.type) {
    /********************************************************
     * User
     */
    case LOGIN_USER:
    case LOGOUT_USER:
      return { ...state, loading: false, error: initError };
    /********************************************************/

    /********************************************************
     * Theme
     */
    case SET_DARK_THEME:
      return {
        ...state,
        settings: { ...state.settings, darkTheme: true }
      };
    case CLEAR_DARK_THEME:
      return {
        ...state,
        settings: { ...state.settings, darkTheme: false }
      };
    /********************************************************/

    /********************************************************
     * Developer menu
     */
    case SET_DEV_MENU:
      return {
        ...state,
        settings: { ...state.settings, devMenu: true }
      };
    case CLEAR_DEV_MENU:
      return {
        ...state,
        settings: { ...state.settings, devMenu: false }
      };
    /********************************************************/

    /********************************************************
     * Loading
     */
    case SET_LOADING:
      return { ...state, loading: true };
    case CLEAR_LOADING:
      return { ...state, loading: false };
    /********************************************************/

    /********************************************************
     * Error
     */
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, loading: false, error: initError };
    /********************************************************/

    default:
      return state;
  }
};

export default uiReducer;
