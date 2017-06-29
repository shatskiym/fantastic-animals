const initState = {
  setMeetingFieldsMode: true,
  characterChoosenMode: false
};

export default function modes (state = initState, action) {
  if (action.type === 'FINISH_SET_MEETING_FILEDS_MODE') {
    return {
      ...state,
      setMeetingFieldsMode: false
    }
  } else if (action.type === 'ENABLE_SELECT_CHARACTER_MODE') {
    return {
      ...state,
      characterChoosenMode: true
    }
  }
  else if (action.type === 'DISABLE_SELECT_CHARACTER_MODE') {
    return {
      ...state,
      characterChoosenMode: false
    }
  }
  return state;
}
