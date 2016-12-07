import { REGISTER_USER } from './UserActions';


// Initial State
const initialState = { 
  isRegistering : true,
  isRegistered : false,
  isRegisteredFailed : false,   
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER :
      return Object.assign( {}, state, {
        isRegistering: false,
        isRegistered: true
      });

    default:
      return state;
  }
};


// Export Reducer
export default UserReducer;
