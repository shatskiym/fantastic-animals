import { combineReducers } from 'redux'

import previewTerrain from './previewTerrain'
import meetingFields from './meetingFields'
import choosingMeetingFieldsMode from './setMeetingFieldsMode'
import animalsSearch from './searchAnimals'
import field from './field'
import character from './character'

export default combineReducers({
  previewTerrain, meetingFields, choosingMeetingFieldsMode, animalsSearch, field, character
});
