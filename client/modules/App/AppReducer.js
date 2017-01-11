// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_LOGIN_FORM, TOGGLE_ADD_VOTE } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };

     case TOGGLE_LOGIN_FORM:
     	return {
     		showLoginForm: !state.showLoginForm,
     	}

    case TOGGLE_ADD_VOTE:
      return {
        showAddVote: !state.showAddVote,
      } 

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

//Get showLoginForm
export const getShowLoginForm = state => state.app.showLoginForm;

// Export Reducer
export default AppReducer;
