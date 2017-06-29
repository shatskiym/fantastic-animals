import React from 'react'

const CharacterContainer = React.createClass({
  topVal: function() {
    if (this.props.field.length) {
      return this.props.field[this.props.character.position].styleProps.top;
    }
    return 0;
    // return this.props.field[this.props.character.position].styleProps.top;
  },
  leftVal: function() {
    if (this.props.field.length) {
      return this.props.field[this.props.character.position].styleProps.left;
    }
    return 0;
    // return this.props.field[this.props.character.position].styleProps.left;
  },
  render: function() {
    return (
      <Character
        styles = {{top: this.topVal(), left: this.leftVal()}}
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
