const initialState = [];

export default function userDonations(state = initialState, action) {
  if (action.type === "GET_API_USER") {
    return [action.data];
  }
  return state;
}
