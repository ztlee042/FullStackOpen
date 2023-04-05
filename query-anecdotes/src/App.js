import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateVote } from './requests'

const App = () => {

  const queryClient = useQueryClient()
  const updateVoteMutation = useMutation(updateVote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => {
        if (anecdote.id === newAnecdote.id) {
          return { ...anecdote, votes: newAnecdote.votes }
        } else {
          return anecdote
        }
      }))
    }
  })

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate(anecdote)
  }

  const result = useQuery(
    'anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (result.status === 'loading') {
    return (
      <span>data is loading</span>
    )
  }

  if (result.status === 'error') {
    return (
      <span>anecdote service not available due to problems in server</span>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
