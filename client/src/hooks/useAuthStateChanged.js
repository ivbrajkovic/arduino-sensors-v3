// Listen for authorization change

import { useEffect, useRef } from 'react';

// Firebase
import firebase from '../firebase/firebase';

// Redux
import { useDispatch } from 'react-redux';
import { LOGIN_USER, LOGOUT_USER } from '../store/types';

const useAuthStateChanged = () => {
  const dispatch = useDispatch();
  const authStateChangeListener = useRef();

  // Change store user state on user login or logout
  useEffect(() => {
    // Listen for authorization state change
    authStateChangeListener.current = firebase.auth.onAuthStateChanged(user => {
      if (user) dispatch({ type: LOGIN_USER, payload: user });
      else dispatch({ type: LOGOUT_USER });
    });
    return () => {
      // Remove listener
      authStateChangeListener.current();
    };
    // eslint-disable-next-line
  }, []);
};

export default useAuthStateChanged;
