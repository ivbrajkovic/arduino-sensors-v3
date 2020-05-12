/**
 * Fetch API helper
 */

// Get base API url from env
const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Fetch user auth API
 * @param {object} param0 Url, method, token, data
 */
const fetchHelper = async ({ url, method = 'GET', token, data }) => {
  try {
    // Request headers
    let headers = {};
    method !== 'GET' && (headers['Content-Type'] = 'application/json');
    token && (headers['Authorization'] = 'Bearer ' + token);

    // Request body
    const body = data && JSON.stringify(data);

    // Get response from login api
    const res = await fetch(baseUrl + url, { method, headers, body });

    // Get JSON objevt from response
    const json = await res.json();

    // If status OK, set user and token
    if (json.status === 'ok') return json;

    // Throw response
    throw json;
  } catch (error) {
    // eslint-disable-next-line
    throw {
      code: error.code || 'unknown_error',
      message: error.message || 'Unknown error',
      details: error.details || []
    };
  }
};

export default fetchHelper;
