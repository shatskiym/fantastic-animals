// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

var Terrains = React.createClass({
  getInitialState: function() {
    var terains = this.createTerrainsArray();
    return {
      terrains : terains
    }
  },
  createTerrainsArray: function() {
    var terrs = [];
    i = 0, len = 54;
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
              return <Terrain
                      tType = {terr.element}
                      key = {val}
                      tDiff = {terr.difficult}
                      changeSelectedTerrain = {that.props.changeSelectedTerrain}/>;
            })
          }
        </div>
      </div>
    );
  }
});

var Terrain = React.createClass({
  handleClick: function() {
    if (this.props.changeSelectedTerrain){
      this.props.changeSelectedTerrain(this.props.tType, this.props.tDiff)
    }
  },
  render: function() {
    return (
      <div className={'terrain-container ' + this.props.tType} onClick={this.handleClick}>
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
        <Terrain
          tType = {this.props.type}
          tDiff = {this.props.diff}
        />
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
        />
        <FieldInfo
          type = {this.props.type}
          diff = {this.props.diff}
        />
        <SearchAnimalsContainer
          diff = {this.props.diff}
        />
      </div>
    )
  }
});

var Board = React.createClass({
  getInitialState: function() {
    return {
      chosenTerrainType: '?',
      chosenTerrainDiff: '?',
      isFirstRender: true
    }
  },
  changeChosenTerrain: function(type, diff) {
    this.setState({
      chosenTerrainType: type,
      chosenTerrainDiff: diff,
      isFirstRender: false
    });
  },
  render: function() {
    return (
      <div>
        <h2 className='field-title'>
          Board
        </h2>
        <div className='board-container'>
          <Terrains data={this.props.data} changeSelectedTerrain={this.changeChosenTerrain} firstTime={this.state.isFirstRender}></Terrains>
          <InfoBoard type={this.state.chosenTerrainType} diff={this.state.chosenTerrainDiff}/>
        </div>
      </div>
    )
  }
});
