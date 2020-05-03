/**
 * Check token acton
 */

import { LOGIN_USER, SET_LOADING, CLEAR_LOADING } from '../../types';

// Login user and update store
const checkTokenAction = token => async dispatch => {
  // Start spinner
  dispatch({ type: SET_LOADING });

  try {
    // Get response from verify api
    const res = await fetch(process.env.REACT_APP_API_URL + '/user/verify', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    // Get JSON objevt from response
    const json = await res.json();

    // Dispatch user data
    if (json?.success)
      return dispatch({ type: LOGIN_USER, payload: json.data || {} });
  } catch (error) {
    // Log error to console
    console.log('checkTokenAction -> error', error);
  } finally {
    // Stop spinner
    dispatch({ type: CLEAR_LOADING });
  }
};

export default checkTokenAction;
