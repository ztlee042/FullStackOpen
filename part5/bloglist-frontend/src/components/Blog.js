const Blog = ({ blog }) => {

  const handleBlogDelete = async (event) => {
    event.preventDefault()
    console.log('deleted!')
  }
  return (
    <div>
      {blog.title} --- {blog.author} <button onClick={handleBlogDelete}>delete</button>
    </div>
  )
}

export default Blog