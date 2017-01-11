import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

// Export Constants
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const STORE_EMAIL = 'STORE_EMAIL';
export const STORE_PASSWORD = 'STORE_PASSWORD';
export const RESET_LOGIN_FORM = 'RESET_LOGIN_FORM';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// Export Actions
export function registerUser(user) {
  return {
    type: REGISTER_USER,
    user,
  };
}

export function loginUser(response, user) {
  console.log("resp", response);
  if(response.success) {
    return {
      type: LOGIN_USER,
      status: response.success,
      user,
    };
  }
}

export function loginUserFailed(error) {
  return {
    type: LOGIN_USER_FAILED,
    error
  }
}

export function storeEmail(email) {
  return {
    type: STORE_EMAIL,
    email,
  };
}

export function storePassword(password) {
  return {
    type: STORE_PASSWORD,
    password,
  };
}

export function resetLoginForm() {
  return {
    type: RESET_LOGIN_FORM
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}

export function registerUserRequest(user) {
  return (dispatch) => {
    return callApi('user/register', 'post', {
      user: {
        fname: user.fnameRef,
        lname: user.lnameRef,
        email: user.emailRef,
        username: user.unameRef,
        password: user.passwordRef,
        role: "D"
      },
    }).then(res => dispatch(registerUser(res.user)));
  };
}

export function loginUserRequest(user) {
  return (dispatch) => {
    return callApi('user/login', 'post', {
      user: {
        email: user.emailRef,
        password: user.passwordRef,
      },
    }).then(res => {
      console.log("res:", res);
      if(res.success) {
        localStorage.setItem("token", res.token);
        console.log(localStorage.getItem('token'));
        dispatch(loginUser(res, res.user))
        //use return before dispatch
        dispatch(resetLoginForm())
        browserHistory.push('/schedule');
      } else {
        dispatch(loginUserFailed(res.errorMessage));
      }
      
    });
  };
}