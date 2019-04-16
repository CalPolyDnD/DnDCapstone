import axios from 'axios';
import * as actionTypes from './actionTypes';

const LOGIN_URL = 'http://localhost:8000/rest-auth/login/';
const LOGOUT_URL = 'http://localhost:8000/rest-auth/logout/';
const REGISTRATION_URL = 'http://localhost:8000/rest-auth/registration';
const ONE_HOUR = 3600;


export const authStart = () => (
  {
    type: actionTypes.AUTH_START,
  }
);

export const authSuccess = token => (
  {
    type: actionTypes.AUTH_SUCCESS,
    token,
  }
);

export const authFail = error => (
  {
    type: actionTypes.AUTH_FAIL,
    error,
  }
);

export const authLogout = () => (
  {
    type: actionTypes.AUTH_LOGOUT,
    // TODO: Set 'logging out property' here
  }
);

export const logout = () => (
  (dispatch) => {
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axios.defaults.xsrfCookieName = 'csrftoken';

    return axios.post(LOGOUT_URL, {})
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        dispatch(authLogout());
      });
  }
);

export const checkAuthTimeout = expirationDate => (
  (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  }
);

export const authLogin = (email, password) => (
  (dispatch) => {
    dispatch(authStart());
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axios.defaults.xsrfCookieName = 'csrftoken';

    return axios.post(LOGIN_URL, {
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
  }
);

export const authSignup = (email, password1, password2) => (
  (dispatch) => {
    dispatch(authStart());
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axios.defaults.xsrfCookieName = 'csrftoken';

    return axios.post(REGISTRATION_URL, {
      email,
      password1,
      password2,
    })
      .then((res) => {
        const token = res.data.key;
        // getTime gives time in ms, so adding ONE_HOUR * 1000 gives exp date of an hour
        const expDate = new Date(new Date().getTime() + ONE_HOUR * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expDate', expDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(ONE_HOUR));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  }
);

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
