import React from 'react'

const CharacterContainer = React.createClass({
  render: function() {
    return (
      <Character
        styles = {this.props.character.styleProps}
        selectCharacter = {this.props.selectCharacter}
      />
    )
  }
});

const Character = React.createClass({
  render: function() {
    return (
      <div className='character' style={this.props.styles} onClick={this.props.selectCharacter}>
      </div>
    )
  }
})

export { CharacterContainer };
