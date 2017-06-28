export default function field (state = [], action) {
  if (action.type === 'CREATE_FIELD') {
    return action.payload
  }
  return state;
}
