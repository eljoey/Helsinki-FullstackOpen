import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const MostVotes = props => {
  let highest = props.votes[0];
  let quoteIndex = 0;

  props.votes.forEach((value, index) => {
    if (highest < value) {
      highest = value;
      quoteIndex = index;
    }
  });

  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <div>{props.anecdotes[quoteIndex]}</div>
      <div>has {highest} votes</div>
    </div>
  );
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0)
  );

  const randQuote = () => {
    let rand = Math.floor(Math.random() * props.anecdotes.length);

    setSelected(rand);
  };

  const addVote = () => {
    const copyOfVotes = [...votes];

    copyOfVotes[selected] += 1;

    setVotes(copyOfVotes);
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>This quote has {votes[selected]} votes</div>
      <button onClick={addVote}>Vote for Anecdote</button>
      <button onClick={randQuote}>Next</button>
      <MostVotes votes={votes} anecdotes={props.anecdotes} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
