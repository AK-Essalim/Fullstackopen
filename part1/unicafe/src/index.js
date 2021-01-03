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
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={good + neutral + bad} />
          </tr>
          <tr>
            <StatisticLine
              text="average"
              value={
                (good * 1 + neutral * 0 + bad * -1) / (good + bad + neutral)
              }
            />
          </tr>
          <tr>
            <StatisticLine
              text="positive"
              value={(good / (good + neutral + bad)) * 100}
              end="%"
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};
const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>
        {props.value} {props.end}
      </td>
    </>
  );
};
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={() => increaseGood()} />
      <Button text="neutral" handleClick={() => increaseNeutral()} />
      <Button text="bad" handleClick={() => increaseBad()} />

      <br />
      <br />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
