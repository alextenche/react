// 'use strict';

var PLAYERS = [
  {
    id: 1,
    name: "Alex Tenche",
    score: 38
  },
  {
    id: 2,
    name: "Alexone Italiano",
    score: 26
  },
  {
    id: 3,
    name: "Dark Vonavianul",
    score: 38
  },
];
var nextId = 4;

var StopWatch = React.createClass({
  getInitialState: function(){
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0
    }
  },

  componentDidMount: function(){
    this.interval = setInterval(this.onTick, 100);
  },

  componentWillUnmount: function(){
    clearInterval(this.interval);
  },

  onTick: function(){
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      });
    }
    console.log('tick');
  },

  onStart: function(){
    this.setState({
      running: true,
      previousTime: Date.now()
    });
  },

  onStop: function(){
    this.setState({ running: false });
  },

  onReset: function(){
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now()
    });
  },

  render: function(){
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className = "stopwatch">
        <h2> stopwatch </h2>
        <div className = "stopwatch-time"> {seconds} </div>
        {this.state.running ? <button onClick = {this.onStop}> stop </button> : <button onClick = {this.onStart}> start </button>}
        <button onClick = {this.onReset}> reset </button>
      </div>
    );
  }

});

var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired
  },

  getInitialState: function(){
    return {
      name: ""
    };
  },

  onNameChange: function(event){
    this.setState({name: event.target.value});
  },


  onSubmit: function(event) {
     event.preventDefault();

     if(this.state.name.length > 0) {
       this.props.onAdd(this.state.name);
       this.setState({name: ""});
     }
   },

  render: function() {
    return (
      <div className = "add-player-form">
        <form onSubmit = {this.onSubmit}>
          <input type = "text" value = {this.state.name} onChange = {this.onNameChange} />
          <input type = "submit" value = "add player" />
        </form>
      </div>
    );
  }
});

function Stats(props)
{
  var totlaPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);

  return (
    <table className = "stats">
      <tbody>
        <tr>
          <td> players </td>
          <td> {totlaPlayers} </td>
        </tr>
        <tr>
          <td> total points </td>
        <td> {totalPoints} </td>
        </tr>
      </tbody>
    </table>
  );
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired
};

function Header(props)
{
  return (
    <div className = "header">
      <Stats players = {props.players} />
      <h1> {props.title} </h1>
      <StopWatch />
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
};


function Counter(props)
{
  return (
    <div className = "counter">
      <button className = "counter-action decrement" onClick = {function() {props.onChange(-1);}} > - </button>
      <div className = "counter-score"> {props.score} </div>
      <button className = "counter-action increment" onClick = {function() {props.onChange(1);}} > + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}


function Player(props)
{
  return (
    <div className = "player">
      <div className = "player-name">
      <a className = "remove-player" onClick = {props.onRemove} > x </a>
        {props.name}
      </div>
      <div className = "player-score">
        <Counter score = {props.score} onChange = {props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
};


var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired
    })).isRequired
  },

  getDefaultProps: function(){
    return {
      title: "scoreboard"
    };
  },

  getInitialState: function(){
    return {
      players: this.props.initialPlayers
    };
  },

  onScoreChange: function(index, delta){
    console.log('onScoreChange', index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  onPlayerAdd: function(name){
    console.log('player added: ', name);
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId
    });
    this.setState(this.state);
    nextId += 1;
  },

  onPlayerRemove: function(index){
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function(){
    return (
      <div className = "scoreboard">
        <Header title = {this.props.title} players = {this.state.players}/>

        <div className = "players">
          {this.state.players.map(function(player, index){
            return (
              <Player
                onScoreChange = {function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                onRemove = {function() {this.onPlayerRemove(index)}.bind(this)}
                name = {player.name}
                score = {player.score}
                key = {player.id}
              />
            );
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd = {this.onPlayerAdd} />
      </div>
    );
  }
});

ReactDOM.render(<Application initialPlayers = {PLAYERS} />, document.getElementById('container'));
