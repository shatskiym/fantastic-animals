// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

import React from 'react'
import { LabelH4, LabelH2, MeetMarker } from './helpers.jsx'
import { CharacterContainer } from './character.jsx'

const Terrains = React.createClass({
  render: function() {
    var that = this;
    return (
      <div className='terrains'>
        <div className = 'terrains-container'>
          {
            this.props.field.map(function(terr,val) {
              if (!that.props.modes.setMeetingFieldsMode) {
                if (that.props.meetFields.indexOf(val) > -1) {
                  return <TerrainContainer
                          tType = {terr.element}
                          key = {val}
                          tDiff = {terr.difficult}
                          index = {val}
                          styleProps = {terr.styleProps}
                          changeSelectedTerrain = {that.props.changeSelectedTerrain}
                          moveCharacter = {that.props.moveCharacter}
                          selectCharacter={that.props.selectCharacter}
                          charSelected = {that.props.modes.characterChoosenMode}/>;
                } else {
                  return <TerrainContainer
                          tType = {terr.element}
                          key = {val}
                          tDiff = ''
                          index = {val}
                          styleProps = {terr.styleProps}
                          changeSelectedTerrain = {that.props.changeSelectedTerrain}
                          moveCharacter = {that.props.moveCharacter}
                          selectCharacter={that.props.selectCharacter}
                          charSelected = {that.props.modes.characterChoosenMode}/>;
                }
              } else {
                return <TerrainContainer
                        tType = {terr.element}
                        key = {val}
                        tDiff = {terr.difficult}
                        index = {val}
                        setMode = {that.props.modes.setMeetingFieldsMode}
                        updateFields = {that.props.updateFields}
                        styleProps = {terr.styleProps}
                        changeSelectedTerrain = {that.props.changeSelectedTerrain}/>;
              }
            })
          }
          { !this.props.modes.setMeetingFieldsMode &&
            <CharacterContainer
              character = {this.props.character}
              selectCharacter = {this.props.selectCharacter}
            />
          }
        </div>
      </div>
    );
  }
});

const TerrainContainer = React.createClass({
  handleClick: function() {
    if (this.props.changeSelectedTerrain){
      this.props.changeSelectedTerrain(this.props.tType, this.props.tDiff, this.props.index)
    }
    if (this.props.charSelected && this.props.moveCharacter) {
      this.props.moveCharacter(this.props.styleProps, this.props.index);
    }
  },
  render: function() {
    return (
      <Terrain
      styleProps = {this.props.styleProps}
      tType = {this.props.tType}
      handleClick = {this.handleClick}
      tDiff = {this.props.tDiff}
      updateFields = {this.props.updateFields}
      setMode = {this.props.setMode}
      index = {this.props.index}/>
    )
  }
});

const Terrain = React.createClass({
  render() {
    return (
      <div className='hexagon' style={this.props.styleProps}>
        <div className={"hex hex2 " + this.props.tType} onClick={this.props.handleClick}></div>
        <div className={"hex hex3 " + this.props.tType} onClick={this.props.handleClick}></div>
        <div className={"hex hex1 " + this.props.tType} onClick={this.props.handleClick}>
          <div>{'Elem: ' + this.props.tType}</div>
          {
            this.props.tDiff && <div className='terrain-difficult'> {"Difficult: " + this.props.tDiff} </div>
          }
          {
            (this.props.setMode && this.props.updateFields) && <TerrainCheckbox updateFields = {this.props.updateFields} index = {this.props.index}/>
          }
          {
            this.props.setMode && <div className='terrain-number'> {this.props.index} </div>
          }
          {
            (!this.props.setMode && this.props.tDiff) && <MeetMarker/>
          }
        </div>
      </div>
    )
  }
});

const TerrainCheckbox = React.createClass({
  chooseField: function() {
    this.props.updateFields(this.props.index, this.refs.checkbox.checked)
  },
  render() {
    return(
      <input type='checkbox' ref={'checkbox'} onChange={this.chooseField}/>
    )
  }
})

export { Terrains, TerrainContainer };
