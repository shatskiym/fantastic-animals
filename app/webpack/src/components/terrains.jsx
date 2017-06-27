// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

import React from 'react'

var Terrains = React.createClass({
  getInitialState: function() {
    var terains = this.createTerrainsArray();
    return {
      terrains : terains
    }
  },
  createTerrainsArray: function() {
    var terrs = [];
    var i = 0, len = 54;
    while (++i <= len) terrs.push(this.props.data[Math.floor(Math.random() * this.props.data.length)]);
    return terrs;
  },
  render: function() {
    var that = this;
    return (
      <div className='terrains'>
        <div className = 'terrains-container'>
          {
            this.state.terrains.map(function(terr,val) {
              if (!that.props.setMode) {
                if (that.props.meetFields.indexOf(val) > -1) {
                  return <Terrain
                          tType = {terr.element}
                          key = {val}
                          tDiff = {terr.difficult}
                          index = {val}
                          changeSelectedTerrain = {that.props.changeSelectedTerrain}/>;
                } else {
                  return <Terrain
                          tType = {terr.element}
                          key = {val}
                          tDiff = ''
                          index = {val}
                          changeSelectedTerrain = {that.props.changeSelectedTerrain}/>;
                }
              } else {
                return <Terrain
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

var Terrain = React.createClass({
  hexHeight: 100,
  generalOffsetLeft: 30,
  offsetLeft: 85,
  handleClick: function() {
    if (this.props.changeSelectedTerrain){
      this.props.changeSelectedTerrain(this.props.tType, this.props.tDiff)
    }
  },
  chooseField: function() {
    this.props.updateFields(this.props.index, this.refs.checkbox.checked)
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
      <div className='hexagon' style={styleProps}>
        <div className={"hex hex2 " + this.props.tType} onClick={this.handleClick}></div>
        <div className={"hex hex3 " + this.props.tType} onClick={this.handleClick}></div>
        <div className={"hex hex1 " + this.props.tType} onClick={this.handleClick}>
          <div>{'Elem: ' + this.props.tType}</div>
          {
            this.props.tDiff && <div className='terrain-difficult'> {"Difficult: " + this.props.tDiff} </div>
          }
          {
            (this.props.setMode && this.props.updateFields) && <input type='checkbox' ref={'checkbox'} onChange={this.chooseField}/>
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

var MeetMarker = React.createClass({
  render: function() {
    return (
      <div className='meet-marker'>
      </div>
    )
  }
});

var LabelH4 = React.createClass({
  render: function() {
    return (
      <h4>
        {this.props.text}
      </h4>
    )
  }
});

var ChosenField = React.createClass({
  render: function() {
    return (
      <div className='chosen-field-container'>
        <LabelH4
          text = 'Chosen field'
        />
        <div className='info-terrain-container'>
          <Terrain
            tType = {this.props.type}
            tDiff = {this.props.diff}
            setMode = {this.props.setMode}
          />
        </div>
      </div>
    )
  }
});

var FieldInfo = React.createClass({
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

var SearchAnimalsResult = React.createClass({
  render: function() {
    var animalFinded = this.props.searchRes >= 2;
    return (
      <div>
        <LabelH4
          text = {"Dice result: " + this.props.diceRes}
        />
        <LabelH4
          text = {"Search result: " + this.props.searchRes}
        />
        <LabelH4
          text = {"Animal is " + (animalFinded ? 'finded!' : 'not finded.')}
        />
      </div>
    )
  }
});

var SearchAnimalsContainer = React.createClass({
  componentWillReceiveProps: function() {
    this.setState({
      diceResult: 0,
      searchResult: 0,
      buttonPressed: false
    });
  },
  getInitialState: function() {
    return {
      diceResult: 0,
      searchResult: 0,
      buttonPressed: false
    }
  },
  buttonPress: function(diceRes, searchRes) {
    this.setState({
      diceResult: diceRes,
      searchResult: searchRes,
      buttonPressed: true
    });
  },
  render:  function() {
    return (
      <div>
        <SearchAnimalsButton
          diff = {this.props.diff}
          search = {this.buttonPress}
        />
        {
          this.state.buttonPressed &&
            <SearchAnimalsResult
              diceRes = {this.state.diceResult}
              searchRes = {this.state.searchResult}
            />
        }
      </div>
    )
  }
});

var SearchAnimalsButton = React.createClass({
  searchAnimals: function() {
    var diceRes = Math.floor(Math.random() * 6) + 1;
    var searchRes = diceRes - this.props.diff;
    this.props.search(diceRes, searchRes);
  },
  render: function() {
    return (
      <button className="btn btn-primary" onClick={this.searchAnimals}>
        Searh Animals
      </button>
    )
  }
});

var InfoBoard = React.createClass({
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
            />
        }
      </div>
    )
  }
});

const Board = React.createClass({ //Main element
  getInitialState: function() {
    return {
      chosenTerrainType: '?',
      chosenTerrainDiff: '?',
      setMode: true,
      selectedFields: []
    }
  },
  changeChosenTerrain: function(type, diff) {
    this.setState({
      chosenTerrainType: type,
      chosenTerrainDiff: diff
    });
  },
  setFields: function(){
    this.setState({
      setMode: false
    })
  },
  updateSelectedFields: function(id, checked) {
    var selected = this.state.selectedFields;
    if (checked) {
      selected[selected.length] = id;
    } else {
      var index = selected.indexOf(id);
      if (index > -1) {
        selected.splice(index, 1);
      }
    }
    this.setState({
      selectedFields: selected
    })
  },
  render: function() {
    return (
      <div>
        <h2 className='field-title'>
          Board
        </h2>
        {
          this.state.setMode && <button className='btn btn-primary' onClick={this.setFields}>Configure Fields</button>
        }
        <div className='board-container'>
          <Terrains
           data={this.props.data}
           changeSelectedTerrain={this.changeChosenTerrain}
           setMode={this.state.setMode}
           meetFields={this.state.selectedFields}
           updateFields={this.updateSelectedFields}></Terrains>
          <InfoBoard type={this.state.chosenTerrainType} diff={this.state.chosenTerrainDiff} setMode={this.state.setMode}/>
        </div>
      </div>
    )
  }
});

export default Board;