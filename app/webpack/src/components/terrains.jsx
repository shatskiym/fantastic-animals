// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

import React from 'react'
import { LabelH4, LabelH2, MeetMarker } from './helpers.jsx'

const Terrains = React.createClass({
  render: function() {
    var that = this;
    return (
      <div className='terrains'>
        <div className = 'terrains-container'>
          {
            this.props.field.map(function(terr,val) {
              if (!that.props.setMode) {
                if (that.props.meetFields.indexOf(val) > -1) {
                  return <TerrainContainer
                          tType = {terr.element}
                          key = {val}
                          tDiff = {terr.difficult}
                          index = {val}
                          changeSelectedTerrain = {that.props.changeSelectedTerrain}/>;
                } else {
                  return <TerrainContainer
                          tType = {terr.element}
                          key = {val}
                          tDiff = ''
                          index = {val}
                          changeSelectedTerrain = {that.props.changeSelectedTerrain}/>;
                }
              } else {
                return <TerrainContainer
                        tType = {terr.element}
                        key = {val}
                        tDiff = {terr.difficult}
                        index = {val}
                        setMode = {that.props.setMode}
                        updateFields = {that.props.updateFields}
                        changeSelectedTerrain = {that.props.changeSelectedTerrain}/>;
              }
            })
          }
        </div>
      </div>
    );
  }
});

const TerrainContainer = React.createClass({
  hexHeight: 100,
  generalOffsetLeft: 30,
  offsetLeft: 85,
  handleClick: function() {
    if (this.props.changeSelectedTerrain){
      this.props.changeSelectedTerrain(this.props.tType, this.props.tDiff)
    }
  },
  topValue: function() {
    if (!this.props.index) {return 0;}
    if (this.props.index % 10 > 4) {
      return ((this.props.index % 5) * this.hexHeight + this.hexHeight / 2);
    }
    return ((this.props.index % 5) * this.hexHeight);
  },
  leftValue: function() {
    if (!this.props.index || this.props.index == 0) {
      return this.generalOffsetLeft;
    }
    return (Math.floor(this.props.index / 5)) * this.offsetLeft + this.generalOffsetLeft;
  },
  render: function() {
    const styleProps = {
      top: this.topValue(),
      left: this.leftValue()
    };
    return (
      <Terrain
        styleProps = {styleProps}
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
