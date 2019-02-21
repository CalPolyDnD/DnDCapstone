import axios from 'axios';
import * as actionTypes from './actionTypes';

let LOGIN_URL = 'http://localhost:8000/rest-auth/login';
let REGISTRATION_URL = 'http://localhost:8000/rest-auth/registration';
let ONE_HOUR = 3600;


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout);
    }, expirationDate * 1000);
  };
};

export const authLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    axios.post( LOGIN_URL, {
      email,
      password,
    })
      .then((res) => {
        const token = res.data.key;
        const expDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expDate', expDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    axios.post( REGISTRATION_URL, {
      email,
      password1,
      password2,
    })
      .then((res) => {
        const token = res.data.key;
        //getTime gives time in ms, so adding ONE_HOUR * 1000 gives exp date of an hour
        const expDate = new Date(new Date().getTime() + ONE_HOUR * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expDate', expDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(ONE_HOUR));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token === null) {
    dispatch(logout());
  } else {
    const expDate = new Date(localStorage.getItem('expDate'));
    if (expDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};
