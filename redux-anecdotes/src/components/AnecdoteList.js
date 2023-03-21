import { useDispatch, useSelector } from "react-redux"
import { Vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    const filterLowerCase = state.filter.toLowerCase()
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterLowerCase))
  })
  const voteButtonHandler = (id) => {
    dispatch(Vote(id))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} <br />
          <button onClick={() => voteButtonHandler(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList