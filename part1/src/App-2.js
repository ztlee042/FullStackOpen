import { useState } from 'react'

const App2 = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const stringMax = anecdotes.length - 1;
    const [vote, setVote] = useState(Array(anecdotes.length).fill(0));
    const [maxIndex, setMaxIndex] = useState(0);

    const handleClick = () => {
        const a = Math.floor(Math.random() * (stringMax - 0 + 1) + 0);
        setSelected(a);
    }

    const handleVoteClick = () => {
        let voteMutate = [...vote];
        voteMutate[selected] += 1;
        setVote(voteMutate);
        let index = voteMutate.indexOf(Math.max(...voteMutate));
        setMaxIndex(index);
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {vote[selected]} votes</p>
            <button onClick={handleVoteClick}>vote</button>
            <button onClick={handleClick}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[maxIndex]}</p>
            <p>has {vote[maxIndex]} votes</p>
        </div>
    )
}

export default App2;