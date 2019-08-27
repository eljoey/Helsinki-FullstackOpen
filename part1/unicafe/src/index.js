import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = props => (
  <button onClick={props.handleClick}>{props.name}</button>
);

const Stat = props => (
  <tr>
    <td>{props.name}</td>
    <td>{props.value}</td>
  </tr>
);

const Stats = props => {
  const total = () => props.good + props.neutral + props.bad;

  const average = () => {
    if (total() === 0) {
      return 'No reviews yet';
    } else {
      return (props.good + props.bad * -1) / total();
    }
  };

  const positive = () => {
    if (total() === 0) {
      return 'No reviews yet';
    } else {
      return props.good / total() + '%';
    }
  };

  //checks if there are any reviews and returns if there is
  if (total() === 0) {
    return (
      <div>
        <h1>Stats</h1>
        <div>No reviews yet</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Stats</h1>
      <table>
        <tbody>
          <Stat name="Good:" value={props.good} />
          <Stat name="Neutral:" value={props.neutral} />
          <Stat name="Bad:" value={props.bad} />
          <Stat name="Total:" value={total()} />
          <Stat name="Average:" value={average()} />
          <Stat name="Positive:" value={positive()} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} name={'Good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} name={'Neutral'} />
      <Button handleClick={() => setBad(bad + 1)} name={'Bad'} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
