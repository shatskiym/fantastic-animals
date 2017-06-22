// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

var Board = React.createClass({
  getInitialState: function() {
    return {
      clickedType: 'none',
      isFirstRender: true
    }
  },
  changeClickedType: function(type) {
    this.setState({
      clickedType: type,
      isFirstRender: false
    });
  },
  render: function() {
    return (
      <Terrains data={this.props.data} changeType={this.changeClickedType} firstTime={this.state.isFirstRender}></Terrains>
    )
  }
});

var Terrains = React.createClass({
  terrs: [],
  getDefaultProps: function() {
    return {
      terrains : []
    }
  },
  getInitialState: function() {
    this.createTerrainsArray();
    return {
      terrains : this.terrs
    }
  },
  createTerrainsArray: function() {
    if(this.props.firstTime) {
      i = 0, len = 54;
      while (++i <= len) this.terrs.push(this.props.data[Math.floor(Math.random() * this.props.data.length)]);
    } else {
      this.terrs = this.state.terrains;
    }
  },
  render: function() {
    var that = this;
    return (
      <div className='terrains'>
        <h2 className='field-title'>
          Field
        </h2>
        <div className = 'terrains-container'>
          {
            this.state.terrains.map(function(terr,val) {
              return <Terrain
                      tType = {terr.element}
                      key = {val}
                      tDiff = {terr.difficult}
                      changeType = {that.props.changeType}/>;
            })
          }
        </div>
      </div>
    );
  }
});

var Terrain = React.createClass({
  changeType: function() {
    this.props.changeType(this.props.tType)
  },
  render: function() {
    return (
      <div className={'terrain-container ' + this.props.tType} onClick={this.changeType}>
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
