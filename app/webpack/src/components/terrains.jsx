// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

import React from 'react'
import { connect } from 'react-redux'

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

const Terrain = React.createClass({
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

const MeetMarker = React.createClass({
  render: function() {
    return (
      <div className='meet-marker'>
      </div>
    )
  }
});

const LabelH4 = React.createClass({
  render: function() {
    return (
      <h4>
        {this.props.text}
      </h4>
    )
  }
});

const ChosenField = React.createClass({
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
      </div>
    )
  }
});

const LabelH2 = React.createClass({
  render() {
    return (
      <h2 className={this.props.classes}>
        {this.props.text}
      </h2>
    )
  }
})

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

const BoardContainer = React.createClass({
  render() {
    return (
      <div className='board-container'>
        <Terrains
         changeSelectedTerrain={this.props.changeTerrainForPreview}
         setMode={this.props.setMode}
         meetFields={this.props.meetingFields}
         updateFields={this.props.updateSelectedFields}
         field={this.props.field}/>
        <InfoBoard
         type={this.props.terrainForPreview.terrainType}
         diff={this.props.terrainForPreview.terrainDiff}
         setMode={this.props.setMode}
         animalsSearch={this.props.animalsSearch}
         searchAnimalsButton={this.props.pressSearchAnimalsButton}
         resetDiceResult={this.props.resetDiceResult}/>
      </div>
    )
  }
})

const Board = React.createClass({ //Main element
  componentDidMount: function() {
    this.props.createField(this.createTerrainsArray());
  },
  createTerrainsArray: function() {
    var terrs = [];
    var i = 0, len = 55;
    while (++i <= len) terrs.push(this.props.data[Math.floor(Math.random() * this.props.data.length)]);
    return terrs;
  },
  changeTerrainForPreview: function(type, diff) {
    this.props.changeTerrainForPreview(diff, type);
    if (this.props.animalsSearch.diceRolled) {
      this.props.resetDiceResult();
    }
  },
  setMeetingFields: function(){
    this.props.finishSetMeetingMode();
  },
  updateSelectedFields: function(id, checked) {
    if (checked) {
      this.props.addNewSelectedField(id);
    } else {
      this.props.removeSelectedField(id);
    }
  },
  render: function() {
    return (
      <div>
        <LabelH2
          text = 'Board'
          classes = 'field-title'/>
        <ConfigureFieldsButton
          setMode = {this.props.setMode}
          setMeetingFields = {this.setMeetingFields}/>
        <BoardContainer
          changeTerrainForPreview={this.changeTerrainForPreview}
          setMode={this.props.setMode}
          meetingFields={this.props.meetingFields}
          updateSelectedFields={this.updateSelectedFields}
          field={this.props.field}
          terrainForPreview={this.props.terrainForPreview}
          animalsSearch={this.props.animalsSearch}
          pressSearchAnimalsButton={this.props.pressSearchAnimalsButton}
          resetDiceResult={this.props.resetDiceResult}
        />
      </div>
    )
  }
});

export default connect(
  function mapStateToProps (state) {
    return {
      terrainForPreview: state.previewTerrain,
      meetingFields: state.meetingFields,
      setMode: state.choosingMeetingFieldsMode,
      animalsSearch: state.animalsSearch,
      field: state.field
    }
  },

  function mapDispatchToProps (dispatch) {
    return {

      changeTerrainForPreview: function(diff, type){
        dispatch({
          type: 'CHANGE_TERRAIN_FOR_PREVIEW',
          payload: {
            terrainDiff: diff,
            terrainType: type
          }
        })
      },

      addNewSelectedField: function(id) {
        dispatch({
          type: 'ADD_NEW_MEETING_FIELD',
          payload: id
        })
      },

      removeSelectedField: function (id) {
        dispatch({
          type: 'REMOVE_MEETING_FIELD',
          payload: id
        })
      },

      finishSetMeetingMode: function () {
        dispatch({
          type: 'FINISH_SET_MEETING_FILEDS_MODE'
        })
      },

      pressSearchAnimalsButton: function(diceRes, searchRes) {
        dispatch({
          type: 'ROLL_DICE',
          payload: {
            diceRes: diceRes,
            searchRes: searchRes
          }
        })
      },

      resetDiceResult: function() {
        dispatch({
          type: 'RESET_DICE_RESULT'
        })
      },

      createField: function(terrains) {
        dispatch({
          type: 'CREATE_FIELD',
          payload: terrains
        })
      }
    }
  }
)(Board);
