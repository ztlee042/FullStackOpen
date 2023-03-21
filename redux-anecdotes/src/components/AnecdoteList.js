import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    const filterLowerCase = state.filter.toLowerCase()
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterLowerCase))
  })
  const voteButtonHandler = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification({
      content: content,
      message: 'You voted ',
      display: 'block'
    }))
    setTimeout(() => {
      dispatch(removeNotification('none'))
    }, 5000);
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} <br />
          <button onClick={() => voteButtonHandler(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList