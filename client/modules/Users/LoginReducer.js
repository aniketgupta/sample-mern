import { LOGIN_USER, LOGIN_USER_FAILED, STORE_EMAIL, STORE_PASSWORD, RESET_LOGIN_FORM, CLEAR_ERROR } from './UserActions';


// Initial State
const initialState = {  
  isLoggingIn : true,
  isLoggedIn : false,
  isLoginFailed : false,
  status : false,
  errorMessage : '',
  user: {
    email : '',
    password : ''
  } 
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER :
      return Object.assign( {}, state, {
        isLoggingIn : false,
        isLoggedIn : true,
        status : action.status,
        user: {
          email : '',
          password : ''
        } 
      });

    case LOGIN_USER_FAILED :
      return Object.assign( {}, state, {
        isLoggingIn : false,
        isLoggedIn : false,
        isLoginFailed : true,
        errorMessage : action.error
      });

    case STORE_EMAIL :
      return Object.assign( {}, state, {
        user:{
          email : action.email
        }
      });

    case STORE_PASSWORD :
      return Object.assign( {}, state, {
        user:{
          password : action.password
        }
      });

    case RESET_LOGIN_FORM :
      return Object.assign( {}, state, {
        user:{
          email : '',
          password : ''
        }
      }); 

    case CLEAR_ERROR:
    return Object.assign( {}, state, {
        errorMessage : ''
      });

    default:
      return state;
  }
};


// Export Reducer
export default LoginReducer;
