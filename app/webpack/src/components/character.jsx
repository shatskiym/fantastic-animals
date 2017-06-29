import React from 'react'

const CharacterContainer = React.createClass({
  render: function() {
    return (
      <Character
        styles = {this.props.character.styleProps}
      />
    )
  }
});

const Character = React.createClass({
  render: function() {
    return (
      <div className='character' style={this.props.styles}>
      </div>
    )
  }
})

export { CharacterContainer };
