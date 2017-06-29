const initState = {
  terrain: 0,
  styleProps: {
    top: 0,
    left: 30
  }
}
export default function character (state = initState, action) {
  if (action.type === 'MOVE_CHARACTER') {
    return {
      styleProps: action.payload.styleProps,
      terrain: action.payload.terrain
    }
  }
  return state;
}
