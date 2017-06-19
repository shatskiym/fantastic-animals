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
    return (
      <div className='terrains'>
        <h2 className='title'>
          Terrains
        </h2>
        <div className = 'terrainsContainer'>
          {
            this.state.terrains.map(function(el){
              return <Terrain
                      tType = {el.element}
                      key = {el.id}
                      tDiff = {el.difficult}/>;
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
      <div className='terrainContainer'>
        <div className='terrainType'>
          {this.props.tType}
        </div>
        <div className='terrainDifficult'>
          {this.props.tDiff}
        </div>
      </div>
    )
  }
});
