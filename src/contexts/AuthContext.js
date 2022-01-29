import { createContext, useEffect, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';
import axios from 'axios';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  const loadUser = async () => {
    // Kiểm tra xem có token trong localStorage hay ko
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    // Kiểm tra xem cái token đó có chính xác hay ko
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      // loại bỏ trong cái header
      setAuthToken(null);
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  // logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: 'SET_AUTH',
      payload: { isAuthenticated: false, user: null },
    });
  };

  // Context data
  useEffect(() => {
    loadUser();
  }, []);

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const authContextData = { loginUser, authState, registerUser, logoutUser };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
