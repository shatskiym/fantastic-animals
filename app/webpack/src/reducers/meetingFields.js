export default function meetingFields (state = [], action) {
  if (action.type === 'ADD_NEW_MEETING_FIELD') {
    return [
      ...state,
        action.payload
    ]
  } else if (action.type === 'REMOVE_MEETING_FIELD') {
    var selectFields = state;
    if (state.indexOf(action.payload) > -1) {
      selectFields.splice(state.indexOf(action.payload), 1);
    }
    return selectFields;
  }
  return state;
}
