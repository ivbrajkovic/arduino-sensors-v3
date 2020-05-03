/**
 * Redirect hook
 */

// React
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const useRedirect = (path, goBack) => {
  console.log('useRedirect -> useRedirect');

  const history = useHistory();
  const location = useLocation();
  const login = useSelector(state => state.user.login);

  useEffect(() => {
    if (!login && location.pathname !== '/signup') history.push('/login');
    else if (login && path) {
      (goBack && history.goBack()) || history.push(path);
    }
  }, [login]);

  return login;
};

export default useRedirect;
