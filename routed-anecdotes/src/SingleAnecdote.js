import { useParams } from "react-router-dom"

const SingleAnecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === Number(id))
  console.log('test', anecdote)
  return (
    <>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      for more information, please see <a href={anecdote.info}>{anecdote.info}</a>
    </>
  )
}

export default SingleAnecdote
