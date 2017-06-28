const initState = true;

export default function choosingMeetingFieldsMode (state = initState, action) {
  if (action.type === 'FINISH_SET_MEETING_FILEDS_MODE') {
    return false;
  }
  return state;
}
