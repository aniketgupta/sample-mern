import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

// Export Constants
export const ADDED_VOTE = 'ADDED_VOTE';
export const ADDED_VOTE_FAILED = 'ADDED_VOTE_FAILED';
export const FETCH_TOTAL_VOTES_KARAN = 'FETCH_TOTAL_VOTES_KARAN';
export const FETCH_TOTAL_VOTES_ARJUN = 'FETCH_TOTAL_VOTES_ARJUN';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// Export Actions

export function addVoteSuccess(response) {
  console.log("resp", response);
  if(response.status) {
    return {
      type: ADDED_VOTE,
      status: response.status,
      success: [response.success]
    };
  }
}

export function addVoteFailed(response) {
  if(response.status) {
    return {
      type: ADDED_VOTE_FAILED,
      status: response.status,
      error: [response.error]
    }
  }
}


export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}


export function addVoteRequest(data) {
  return (dispatch) => {
    return callApi('add_vote', 'post',{
      data: {
        name: data.name
      }
    }).then(res => {
      if(res.status) {
        console.log("res:", res);
        dispatch(addVoteSuccess(res))
        dispatch(clearError());
      } else if (res.error) {
        dispatch(addVoteFailed(res));
        dispatch(clearError());
      }
    });
  };
}

export function fetchTotalVotesKaranRequest() {
  return (dispatch) => {
    return callApi('total_votes_karan').then(res => {
      dispatch(fetchTotalVotesKaranSuccess(res.data));
    });
  };
}

export function fetchTotalVotesArjunRequest() {
  return (dispatch) => {
    return callApi('total_votes_arjun').then(res => {
      dispatch(fetchTotalVotesArjunSuccess(res.data));
    });
  };
}

export function fetchTotalVotesKaranSuccess(res) {
  console.log(res[0].votes)
  return {
    type: FETCH_TOTAL_VOTES_KARAN,
    votesKaran: res[0].votes,
  };
}

export function fetchTotalVotesArjunSuccess(res) {
  console.log(res[0].votes)
  return {
    type: FETCH_TOTAL_VOTES_ARJUN,
    votesArjun: res[0].votes,
  };
}
