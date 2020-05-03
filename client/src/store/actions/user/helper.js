/**
 * User action helper
 */

import { LOGIN_USER, SET_ERROR } from '../../types';

/**
 * Parse response from user actions
 * @param {object} data Response from API
 * @param {function} dispatch Redux dispatcher
 */
const parseJsonResponse = (data, dispatch) => {
  // If status OK, set user and token
  if (data.status === 'ok') {
    // Set local storage
    window.localStorage.setItem('token', data.token || '');

    // Dispatch user data
    dispatch({ type: LOGIN_USER, payload: data.user || {} });
  }

  // Dispatch error if something is wrong
  else if (data.status === 'error') {
    const { code = '', message = '', details = [] } = data;
    dispatch({ type: SET_ERROR, payload: { code, message, details } });
  }

  // Set unknown error
  else
    dispatch({
      type: SET_ERROR,
      payload: {
        code: 'unknown_error',
        message: 'Unknown error',
        details: []
      }
    });
};

export default parseJsonResponse;
