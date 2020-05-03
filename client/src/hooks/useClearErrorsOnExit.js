/**
 * Clear store errors on dismounting component
 */

// React
import { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { clearErrorsAction } from '../store/actions';

const useClearErrorsOnExit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      // Clear error if any on exit
      dispatch(clearErrorsAction());
    };
  }, []);
};

export default useClearErrorsOnExit;
