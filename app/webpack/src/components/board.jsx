import React from 'react'
import { connect } from 'react-redux'
import { Terrains } from './terrains.jsx'
import { InfoBoard } from './info_board.jsx'
import { LabelH2 } from './helpers.jsx'

const BoardContainer = React.createClass({
  render() {
    return (
      <div className='board-container'>
        <Terrains
         changeSelectedTerrain={this.props.changeTerrainForPreview}
         modes={this.props.modes}
         meetFields={this.props.meetingFields}
         updateFields={this.props.updateSelectedFields}
         field={this.props.field}
         character={this.props.character}
         moveCharacter={this.props.moveCharacter}
         selectCharacter={this.props.selectCharacter}
         deselectCharacter = {this.props.deselectCharacter}/>
        <InfoBoard
         type={this.props.terrainForPreview.terrainType}
         diff={this.props.terrainForPreview.terrainDiff}
         modes={this.props.modes}
         animalsSearch={this.props.animalsSearch}
         searchAnimalsButton={this.props.pressSearchAnimalsButton}
         resetDiceResult={this.props.resetDiceResult}
         finishSetMeetingMode={this.props.finishSetMeetingMode}
         character={this.props.character}/>
      </div>
    )
  }
})

const Board = React.createClass({ //Main element
  hexHeight: 100,
  generalOffsetLeft: 30,
  offsetLeft: 85,
  componentWillMount: function(){
    this.props.createField(this.createTerrainsArray());
  },
  topValue: function(index) {
    if (index % 10 > 4) {
      return ((index % 5) * this.hexHeight + this.hexHeight / 2);
    }
    return ((index % 5) * this.hexHeight);
  },
  leftValue: function(index) {
    if (!index || index == 0) {
      return this.generalOffsetLeft;
    }
    return ((Math.floor(index / 5)) * this.offsetLeft + this.generalOffsetLeft);
  },
  createTerrainsArray: function() {
    var terrs = [];
    var i = -1, len = 53;
    while (i++ <= len) {
      var terr = {}
      var buffTerr = this.props.data[Math.floor(Math.random() * this.props.data.length)]
      terr.element = buffTerr.element;
      terr.difficult = buffTerr.difficult;
      terr.styleProps = {
        top: this.topValue(i),
        left: this.leftValue(i)
      }
      terrs[i] = terr;
    };
    return terrs;
  },
  changeTerrainForPreview: function(type, diff) {
    this.props.changeTerrainForPreview(diff, type);
    if (this.props.animalsSearch.diceRolled) {
      this.props.resetDiceResult();
    }
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
        <BoardContainer
          changeTerrainForPreview={this.changeTerrainForPreview}
          modes={this.props.modes}
          meetingFields={this.props.meetingFields}
          updateSelectedFields={this.updateSelectedFields}
          field={this.props.field}
          terrainForPreview={this.props.terrainForPreview}
          animalsSearch={this.props.animalsSearch}
          pressSearchAnimalsButton={this.props.pressSearchAnimalsButton}
          resetDiceResult={this.props.resetDiceResult}
          finishSetMeetingMode={this.props.finishSetMeetingMode}
          character={this.props.character}
          moveCharacter={this.props.moveCharacter}
          selectCharacter = {this.props.selectCharacter}
          deselectCharacter = {this.props.deselectCharacter}
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
      modes: state.modes,
      animalsSearch: state.animalsSearch,
      field: state.field,
      character: state.character
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
      },

      moveCharacter: function(styleProps, index) {
        dispatch({
          type: 'MOVE_CHARACTER',
          payload: {
            terrain: index,
            styleProps: styleProps
          }
        })
      },

      selectCharacter: function() {
        dispatch({
          type: 'ENABLE_SELECT_CHARACTER_MODE'
        })
      },

      deselectCharacter: function() {
        dispatch({
          type: 'DISABLE_SELECT_CHARACTER_MODE'
        })
      }
    }
  }
)(Board);
