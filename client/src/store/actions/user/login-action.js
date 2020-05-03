/**
 * User login actions
 */

import { SET_ERROR, SET_LOADING } from '../../types';

import parseJsonResponse from './helper';

// Login user and update store
const loginAction = (email, password) => async dispatch => {
  // Start spinner
  dispatch({ type: SET_LOADING });

  try {
    // Get response from login api
    const res = await fetch(process.env.REACT_APP_API_URL + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    // Get JSON objevt from response
    const json = await res.json();

    // Parse and dispatch response from API
    parseJsonResponse(json, dispatch);
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { code: 'unknown_error', message: error.toString() }
    });
  }
};

export default loginAction;
