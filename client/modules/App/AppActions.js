// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_LOGIN_FORM = 'TOGGLE_LOGIN_FORM';

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
