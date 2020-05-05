/**
 * Fetch helper
 */

// Base API url
const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Fetch user auth API
 * @param {object} param0 Url, method, token, data
 */
const fetchHelper = async ({ url, method = 'GET', token, data }) => {
  console.log('fetchHelper -> method', method);
  try {
    // Request headers
    let headers = {};
    // method !== 'GET' || (token && (headers = {}));
    method !== 'GET' && (headers['Content-Type'] = 'application/json');
    token && (headers['Authorization'] = 'Bearer ' + token);

    // Request body
    const body = data && JSON.stringify(data);

    // Get response from login api
    const res = await fetch(baseUrl + url, { method, headers, body });

    // Get JSON objevt from response
    const json = await res.json();

    // If status OK, set user and token
    if (json.status === 'ok') {
      // Set local storage
      // window.localStorage.setItem('token', json.token || '');
      // Dispatch user data
      // dispatch({ type: LOGIN_USER, payload: json.user || {} });
      return json;
    }

    // Dispatch error if something is wrong
    // else if (json.status === 'error') {
    // const { code = '', message = '', details = [] } = json;
    // dispatch(setErrorAction({ code, message, details }));
    throw json;
    // }

    // Set unknown error
    // else dispatch(setUnknownErrorAction());
  } catch (error) {
    throw {
      code: error.code || 'unknown_error',
      message: error.message || 'Unknown error',
      details: error.details || []
    };
    // dispatch(
    //   setErrorAction({ code: 'unknown_error', message: error.toString() })
    // );
  }
};

export default fetchHelper;
