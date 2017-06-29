const initState = {
  position: 0
}
export default function character (state = initState, action) {
  if (action.type === 'MOVE_CHARACTER') {
    return {
      ...state,
      position: action.payload
    }
  }
  return state;
}
