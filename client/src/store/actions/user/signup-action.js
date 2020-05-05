/**
 * Signup user action
 */

// User types
import { LOGIN_USER } from '../../types';

// UI actions
import { setLoadingAction, setErrorAction } from '../ui/ui-action';

// Fetch helper
import { fetchHelper } from '../../../helper';

// Signup new user and update store
const signupAction = user => async dispatch => {
  // Start spinner
  dispatch(setLoadingAction());

  try {
    // Fetch signup API
    const data = await fetchHelper({
      url: '/user/register',
      method: 'POST',
      data: user
    });

    // Save token to local storage
    window.localStorage.setItem('token', data.token || '');

    // Dispatch user data
    dispatch({ type: LOGIN_USER, payload: data.user || {} });
  } catch (error) {
    dispatch(setErrorAction(error));
  }
};

export default signupAction;
