
function Application(props)
{
  return (
    <div className = "scoreboard">
      <div className = "header">
        <h1> {props.title} </h1>
      </div>

      <div className = "players">

        <div className = "player">
          <div className = "player-name">
            Alex Tenche
          </div>
          <div className = "player-score">
            <div className = "counter">
              <button className = "counter-action decrement"> - </button>
              <div className = "counter-score"> 38 </div>
              <button className = "counter-action increment"> + </button>
            </div>
          </div>
        </div>

        <div className = "player">
          <div className = "player-name">
            Alex Tenche clone
          </div>
          <div className = "player-score">
            <div className = "counter">
              <button className = "counter-action decrement"> - </button>
              <div className = "counter-score"> 38 </div>
              <button className = "counter-action increment"> + </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

ReactDOM.render(<Application title = "my scoreboard"/>, document.getElementById('container'));
