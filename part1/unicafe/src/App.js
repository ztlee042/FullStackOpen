import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  < button onClick={handleClick} >
    {text}
  </button >
)

const StatisticLine = ({ text, value, punct }) => (
  <tr>
    <td>{text}</td>
    <td>{value}{punct}</td>
  </tr>
)

const Statistic = ({ good, neutral, bad }) => (
  <>
    <h2>statistics</h2>
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + bad + neutral} />
        <StatisticLine text="average" value={(good - bad) > 0 ? (good - bad) / (good + neutral + bad) : 0} />
        <StatisticLine text="positive" value={good > 0 ? ((good) / (good + neutral + bad)) * 100 : 0} punct="%" />
      </tbody>
    </table>
  </>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      {(good + neutral + bad) > 0 ? <Statistic good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>}
    </>
  )
}

export default App