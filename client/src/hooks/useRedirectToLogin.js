/**
 * Redirect hook
 */

// React
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const useRedirectToLogin = () => {
  console.log('useRedirectToLogin -> hook');

  const history = useHistory();
  const login = useSelector(state => state.user.login);

  useEffect(() => {
    if (!login) history.push('/login');

    // if (!login && location.pathname !== '/signup') history.push('/login');
    // else if (login && path) {
    //   (goBack && history.goBack()) || history.push(path);
    // }

    // eslint-disable-next-line
  }, []);

  return login;
};

export default useRedirectToLogin;
