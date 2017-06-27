import React from 'react'
import ReactDOM from 'react-dom'
import Board from './src/components/terrains.jsx'

document.addEventListener("DOMContentLoaded", function(){
  var terrains = document.getElementById('board_react_container').getAttribute('data');
  ReactDOM.render(<Board data = {JSON.parse(terrains)}/>, document.getElementById('board_react_container'));
});
