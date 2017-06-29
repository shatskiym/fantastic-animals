export default function character (state = 0, action) {
  if (action.type === 'MOVE_CHARACTER') {
    return action.payload
  }
  return state;
}
