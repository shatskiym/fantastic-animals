import React from 'react'
import { connect } from 'react-redux'
import { Terrains, InfoBoard } from './terrains.jsx'
import { LabelH2 } from './helpers.jsx'

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
         resetDiceResult={this.props.resetDiceResult}
         finishSetMeetingMode={this.props.finishSetMeetingMode}/>
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
          setMode={this.props.setMode}
          meetingFields={this.props.meetingFields}
          updateSelectedFields={this.updateSelectedFields}
          field={this.props.field}
          terrainForPreview={this.props.terrainForPreview}
          animalsSearch={this.props.animalsSearch}
          pressSearchAnimalsButton={this.props.pressSearchAnimalsButton}
          resetDiceResult={this.props.resetDiceResult}
          finishSetMeetingMode={this.props.finishSetMeetingMode}
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
