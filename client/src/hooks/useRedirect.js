// Redirect if not logged in

// React
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const useRedirect = () => {
  const history = useHistory();
  const location = useLocation();
  const login = useSelector(state => state.user.login);

  useEffect(() => {
    if (login) history.push('/');
    else if (location.pathname !== '/signup') history.push('/login');
    // // eslint-disable-next-line
  }, [login]);

  return login;
};

export default useRedirect;
