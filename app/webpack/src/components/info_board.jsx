import React from 'react'
import { LabelH4 } from './helpers.jsx'
import { TerrainContainer } from './terrains.jsx'

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

export const SearchAnimalsButton = React.createClass({
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

export { InfoBoard };
