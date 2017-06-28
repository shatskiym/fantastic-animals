import React from 'react'
import ReactDOM from 'react-dom'
import Board from './src/components/terrains.jsx'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './src/reducers'

document.addEventListener("DOMContentLoaded", function(){
  const appStore = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  var terrains = document.getElementById('board_react_container').getAttribute('data');
  ReactDOM.render(
    <Provider store={appStore}>
      <Board data = {JSON.parse(terrains)}/>
    </Provider>,
    document.getElementById('board_react_container')
  );
});
