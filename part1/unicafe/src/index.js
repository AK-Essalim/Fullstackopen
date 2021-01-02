import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  if (good + bad + neutral === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>
        average {(good * 1 + neutral * 0 + bad * -1) / (good + bad + neutral)}
      </p>
      <p>positive {(good / (good + neutral + bad)) * 100}%</p>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <br />
      <br />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
