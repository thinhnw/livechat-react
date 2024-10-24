import { createContext, useReducer, useEffect } from 'react';
import Prop from 'prop-types';
import { apiFetch } from '../utils/api';

const UserMeContext = createContext();

const initialState = {
  userMe: null,
  loading: true,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return { ...state, userMe: action.payload, loading: false };
    case 'FETCH_USER_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const UserMeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem('userMe');

      if (storedUser) {
        // If user data exists in localStorage, load it
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: JSON.parse(storedUser) });
      } else {
        // Fetch from API if not in localStorage
        try {
          const data = await apiFetch('/auth/me'); // Replace with your actual endpoint

          // Store user data in localStorage
          localStorage.setItem('userMe', JSON.stringify(data));
          
          dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
        } catch (error) {
          dispatch({ type: 'FETCH_USER_FAILURE', payload: error.message });
        }
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <UserMeContext.Provider value={{ state }}>
      {children}
    </UserMeContext.Provider>
  );
};

UserMeProvider.propTypes = {
  children: Prop.node.isRequired,
};

export { UserMeProvider as UserMeProvider, UserMeContext as UserMeContext };
