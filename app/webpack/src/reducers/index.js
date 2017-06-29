import { combineReducers } from 'redux'

import previewTerrain from './previewTerrain'
import meetingFields from './meetingFields'
import modes from './modes'
import animalsSearch from './searchAnimals'
import field from './field'
import character from './character'

export default combineReducers({
  previewTerrain, meetingFields, modes, animalsSearch, field, character
});
