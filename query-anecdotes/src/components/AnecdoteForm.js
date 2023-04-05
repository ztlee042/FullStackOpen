import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "react-query"
import { useNotificationDispatch } from "../context/notificationContext"

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })


  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = {
      content: content,
      votes: 0
    }
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(newAnecdote)
    notificationDispatch({ type: 'ADD', payload: content })
    setTimeout(() => {
      notificationDispatch({ type: 'NULL' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
