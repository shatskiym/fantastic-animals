import React from 'react'
import ReactDOM from 'react-dom'
import Board from './src/components/terrains.jsx'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initState = {
  previewTerrain: {
    terrainDiff: '?',
    terrainType: '?'
  },
  meetingFields: [],
  choosingMeetingFieldsMode: true
};

function appReducer (state = initState, action) {
  if (action.type === 'CHANGE_TERRAIN_FOR_PREVIEW') {
    return {
      ...state,
      previewTerrain: {
        terrainDiff: action.payload.terrainDiff,
        terrainType: action.payload.terrainType
      }
    }
  } else if (action.type === 'ADD_NEW_MEETING_FIELD') {
    return {
      ...state,
      meetingFields: [
        ...state.meetingFields,
        action.payload
      ]
    }
  } else if (action.type === 'REMOVE_MEETING_FIELD') {
    var selectFields = state.meetingFields;
    if (state.meetingFields.indexOf(action.payload) > -1) {
      selectFields.splice(state.meetingFields.indexOf(action.payload), 1);
    }
    return {
      ...state,
      meetingFields: selectFields
    }
  } else if (action.type === 'FINISH_SET_MEETING_FILEDS_MODE') {
    return {
      ...state,
      choosingMeetingFieldsMode: false
    }
  }
  return state;
}

document.addEventListener("DOMContentLoaded", function(){
  const appStore = createStore(appReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  var terrains = document.getElementById('board_react_container').getAttribute('data');
  ReactDOM.render(
    <Provider store={appStore}>
      <Board data = {JSON.parse(terrains)}/>
    </Provider>,
    document.getElementById('board_react_container')
  );
});
