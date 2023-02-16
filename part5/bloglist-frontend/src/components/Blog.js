import { useState } from "react"

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // const handleBlogDelete = async (event) => {
  //   event.preventDefault()
  //   console.log('deleted!')
  // }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes} <button>like</button></p>
        <p>Author: {blog.author}</p>
      </div>
      {/* {blog.title} --- {blog.author} <button onClick={handleBlogDelete}>delete</button> */}
    </div>
  )
}

export default Blog