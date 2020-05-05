/**
 * Verify token acton
 */

// User types
import { LOGIN_USER, LOGOUT_USER } from '../../types';

// UI actions
import { setLoadingAction, setErrorAction } from '../../actions';

// Fetch helper
import { fetchHelper } from '../../../helper';

// Login user and update store
const tokenAction = token => async dispatch => {
  console.log('tokenAction -> tokenAction');

  // Start spinner
  dispatch(setLoadingAction());

  try {
    // Fetch verify token API
    const data = await fetchHelper({ url: '/user/verify', token });

    // Dispatch user data
    dispatch({ type: LOGIN_USER, payload: data.user || {} });
  } catch (error) {
    // If token error logout user
    /^JWT_/.test(error.code) && dispatch({ type: LOGOUT_USER });

    // Dispatch error
    dispatch(setErrorAction(error));
  }
};

export default tokenAction;
