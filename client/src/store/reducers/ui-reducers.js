// Ui reducers

import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  SET_DEV_MENU,
  SET_DARK_THEME,
  SET_SHOW_ALL_ERRORS
} from '../types';

const initSettings = {
  darkTheme: false,
  devMenu: false,
  showAllErrors: false
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
        settings: { ...state.settings, darkTheme: action.payload }
      };
    /********************************************************/

    /********************************************************
     * Developer menu
     */
    case SET_DEV_MENU:
      return {
        ...state,
        settings: { ...state.settings, devMenu: action.payload }
      };
    /********************************************************/

    /********************************************************
     * Developer menu
     */
    case SET_SHOW_ALL_ERRORS:
      return {
        ...state,
        settings: { ...state.settings, showAllErrors: action.payload }
      };
    /********************************************************/

    /********************************************************
     * Loading
     */
    case SET_LOADING:
      return { ...state, loading: action.payload };
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
