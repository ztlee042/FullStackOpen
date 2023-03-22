import { useDispatch, useSelector } from "react-redux"
import { updateVote, initializeNotes } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"
import { useEffect } from "react"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    const filterLowerCase = state.filter.toLowerCase()
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterLowerCase))
  })

  const voteButtonHandler = (anecdote) => {
    dispatch(updateVote(anecdote))
    const notification = `you voted '${anecdote.content}'`
    dispatch(notify(notification, 'block', 5))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} <br />
          <button onClick={() => voteButtonHandler(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList