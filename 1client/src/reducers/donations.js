const initialState = [];

export default function donations(state = initialState, action) {
  if (action.type === 'GET_API') {
    return [
      ...state,
      action.data
    ];
  }
  return state;
}