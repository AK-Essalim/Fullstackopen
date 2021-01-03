import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ anecdotes, votes, i }) => {
  if (votes[i] < 1) {
    return <p>No votes have been cast yet!</p>;
  }

  return (
    <>
      <p>{anecdotes[i]}</p>
      <p>has {votes[i]} votes</p>
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );
  console.log(anecdotes[anecdotes.indexOf(Math.max(...anecdotes))]);

  let i = votes.indexOf(Math.max(...votes));

  console.log(votes);
  const handleVote = (selected) => {
    const vote = [...votes];
    vote[selected] = vote[selected] + 1;
    setVotes(vote);
    let i = votes.indexOf(Math.max(...votes));
    console.log(i);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={() => handleVote(selected)}>Vote</button>
      <button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      >
        next anecdote
      </button>
      <br />
      <h1>Anecdote with most votes</h1>

      <Anecdote anecdotes={anecdotes} votes={votes} i={i} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
