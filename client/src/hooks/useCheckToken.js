/**
 * Check stored token hook
 */

// React
import { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { checkTokenAction } from '../store/actions';

const useCheckToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    token && dispatch(checkTokenAction(token));
  }, []);
};

export default useCheckToken;
