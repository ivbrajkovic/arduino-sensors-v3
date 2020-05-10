/**
 * Redirect hook
 */

// React
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const useRedirect = () => {
  console.log('useRedirect -> hook');

  const history = useHistory();
  const login = useSelector(state => state.user.login);

  useEffect(() => {
    if (login) history.push('/');
    // eslint-disable-next-line
  }, [login]);
};

export default useRedirect;
