import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
// import { appendAnecdote } from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default AnecdoteForm