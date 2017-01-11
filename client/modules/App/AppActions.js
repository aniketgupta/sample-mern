// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_LOGIN_FORM = 'TOGGLE_LOGIN_FORM';
export const TOGGLE_ADD_VOTE = 'TOGGLE_ADD_VOTE';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function toggleLoginForm() {
  return {
    type: TOGGLE_LOGIN_FORM,
  };
}

export function toggleAddVote() {
  return {
    type: TOGGLE_ADD_VOTE,
  };
}
