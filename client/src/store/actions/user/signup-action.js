/**
 * Signup user action
 */

import { SET_LOADING, SET_ERROR } from '../../types';

import parseJsonResponse from './helper';

// Signup new user and update store
const signupAction = user => async dispatch => {
  // Start spinner
  dispatch({ type: SET_LOADING });

  try {
    // Get response from login api
    const res = await fetch(process.env.REACT_APP_API_URL + '/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
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

export default signupAction;
