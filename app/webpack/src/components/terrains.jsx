// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

import React from 'react'
import {LabelH4, LabelH2, MeetMarker} from './helpers.jsx'

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

const ChosenField = React.createClass({
  render: function() {
    return (
      <div className='chosen-field-container'>
        <LabelH4
          text = 'Chosen field'
        />
        <div className='info-terrain-container'>
          <TerrainContainer
            tType = {this.props.type}
            tDiff = {this.props.diff}
            setMode = {this.props.setMode}
          />
        </div>
      </div>
    )
  }
});

const FieldInfo = React.createClass({
  render: function() {
    return (
      <div>
        <LabelH4
          text = "Info about field"
        />
        <LabelH4
          text = {"Terrain type: "+this.props.type}
        />
        <LabelH4
          text = {"Terrain difficult: "+this.props.diff}
        />
      </div>
    )
  }
});

const SearchAnimalsResult = React.createClass({
  render: function() {
    return (
      <div>
        <LabelH4
          text = {"Dice result: " + this.props.diceRes}
        />
        <LabelH4
          text = {"Search result: " + this.props.searchRes}
        />
        <LabelH4
          text = {"Animal is " + (this.props.animalFinded ? 'finded!' : 'not finded.')}
        />
      </div>
    )
  }
});

const SearchAnimalsContainer = React.createClass({
  buttonPress: function(diceRes, searchRes) {
    var diceRes = Math.floor(Math.random() * 6) + 1;
    var searchRes = diceRes - this.props.diff;
    this.props.searchAnimalsButton(diceRes, searchRes);
  },
  render:  function() {
    return (
      <div>
        <SearchAnimalsButton
          diff = {this.props.diff}
          searchAnimals = {this.buttonPress}
        />
        {
          this.props.animalsSearch.diceRolled &&
            <SearchAnimalsResult
              diceRes = {this.props.animalsSearch.diceResult}
              searchRes = {this.props.animalsSearch.searchResult}
              animalFinded = {this.props.animalsSearch.searchResult >= 2}
            />
        }
      </div>
    )
  }
});

const SearchAnimalsButton = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" onClick={this.props.searchAnimals}>
        Searh Animals
      </button>
    )
  }
});

const InfoBoard = React.createClass({
  render: function() {
    return (
      <div className='info-board-container'>
        <ChosenField
          type = {this.props.type}
          diff = {this.props.diff}
          setMode = {this.props.setMode}
        />
        {
          this.props.diff &&
          <FieldInfo
            type = {this.props.type}
            diff = {this.props.diff}
          />
        }
        {
          (this.props.diff && !this.props.setMode) &&
          <SearchAnimalsContainer
            diff = {this.props.diff}
            animalsSearch = {this.props.animalsSearch}
            searchAnimalsButton = {this.props.searchAnimalsButton}
            resetDiceResult={this.props.resetDiceResult}
          />
        }
        {
          this.props.setMode &&
          <ConfigureFieldsButton
            setMode = {this.props.setMode}
            setMeetingFields = {this.props.finishSetMeetingMode}/>
        }
      </div>
    )
  }
});

const ConfigureFieldsButton = React.createClass({
  render() {
    if (this.props.setMode) {
      return (
        <button className='btn btn-primary' onClick={this.props.setMeetingFields}>
          Configure Fields
        </button>
      )
    } else {
      return null;
    }
  }
})


export { Terrains, InfoBoard };
