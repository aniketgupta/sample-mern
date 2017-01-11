import { ADDED_VOTE, ADDED_VOTE_FAILED, FETCH_TOTAL_VOTES_KARAN, FETCH_TOTAL_VOTES_ARJUN, CLEAR_ERROR } from './VoteActions';


// Initial State
const initialState = { 
  status: false,
  isGivenVote : false,
  isGivenVoteFailed : false,  
  success: [],
  error: [],
  votesKaran: '',
  votesArjun: ''
};

const VoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDED_VOTE :
      return Object.assign( {}, state, {
        status: true,
        isGivenVote: true,
        success: action.success
      });

    case ADDED_VOTE_FAILED :
      return Object.assign( {}, state, {
        status: false,
        isGivenVoteFailed: true,
        error: action.error
      });

    case FETCH_TOTAL_VOTES_KARAN :
      return {
        votesKaran : action.votesKaran
      };

    case FETCH_TOTAL_VOTES_ARJUN :
      return {
        votesArjun : action.votesArjun
      };

    case CLEAR_ERROR:
      return Object.assign( {}, state, {
        status : false,
        isGivenVoteFailed: false,
        success: [],
        error : [],
      });

    default:
      return state;
  }
};


// Export Reducer
export default VoteReducer;
