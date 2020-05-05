/**
 * Check stored token hook
 */

// React
import { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { tokenAction } from '../store/actions';

const useCheckToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    console.log('useCheckToken -> useEffect');

    token && dispatch(tokenAction(token));
  }, []);
};

export default useCheckToken;
