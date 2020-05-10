/**
 * Check stored token hook
 */

// React
import { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { tokenAction } from '../store/actions';

const useCheckToken = () => {
  console.log('useCheckToken -> useCheckToken');
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    token && dispatch(tokenAction(token));
    // eslint-disable-next-line
  }, []);
};

export default useCheckToken;
