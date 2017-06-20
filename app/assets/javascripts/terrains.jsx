// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

var Terrains = React.createClass({
  getDefaultProps: function() {
    return {
      terrains : []
    }
  },
  getInitialState: function() {
    return {
      terrains : this.props.data
    }
  },
  render: function() {
    var terrs = [], i = 0, len = 54;
    while (++i <= len) terrs.push(this.state.terrains[Math.floor(Math.random() * this.state.terrains.length)]);
    return (
      <div className='terrains'>
        <h2 className='field-title'>
          Field
        </h2>
        <div className = 'terrains-container'>
          {
            terrs.map( function(terr,val) {
              return <Terrain
                      tType = {terr.element}
                      key = {val}
                      tDiff = {terr.difficult}/>;
            })
          }
        </div>
      </div>
    );
  }
});

var Terrain = React.createClass({
  render: function() {
    return (
      <div className={'terrain-container ' + this.props.tType}>
        <div className='terrain-type'>
          {this.props.tType}
        </div>
        <div className='terrain-difficult'>
          {this.props.tDiff}
        </div>
      </div>
    )
  }
});
