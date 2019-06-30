import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

function authSuccess(dispatch, token, callback) {
  dispatch({
    type: AUTH_USER,
    payload: token
  });

  localStorage.setItem('authToken', token);

  if (callback) callback();
}

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/signup', formProps);

    authSuccess(dispatch, response.data.token, callback);
  }
  catch (exc) {
    const errorMessage = exc.response && exc.response.data ? exc.response.data.error : exc.message;
    dispatch({
      type: AUTH_ERROR,
      payload: errorMessage
    });
  }
}

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/signin', formProps);

    authSuccess(dispatch, response.data.token, callback);
  }
  catch (exc) {
    let errorMessage = "Invalid login credentials.";
    if (exc.response && exc.response.status !== 401)
      errorMessage = exc.message;
    dispatch({
      type: AUTH_ERROR,
      payload: errorMessage
    });
  }
}

export const signout = () => {
  localStorage.removeItem('authToken');

  return {
    type: AUTH_USER,
    payload: ''
  };
}
