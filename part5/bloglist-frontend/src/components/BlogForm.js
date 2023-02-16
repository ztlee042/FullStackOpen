import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({
    createNewBlog
}) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
    const emptyBlog = {
        title: '',
        author: '',
        url: ''
    }
    const handleBlogCreation = async (event) => {
        event.preventDefault()
        const newBlogObject = newBlog
        createNewBlog(newBlogObject)
        setNewBlog(emptyBlog)
    }

    return (
        <>
            <h2> Create New Note</h2>
            <form onSubmit={handleBlogCreation}>
                {/* good practice for web accessibility */}
                <label>
                    title:
                    <input
                        type="text"
                        name="title"
                        value={newBlog.title}
                        onChange={({ target }) => { setNewBlog({ ...newBlog, title: target.value }) }}
                    ></input>
                </label>
                <br />
                <label>
                    author:
                    <input
                        type="text"
                        value={newBlog.author}
                        onChange={({ target }) => { setNewBlog({ ...newBlog, author: target.value }) }}
                    ></input>
                </label>
                <br />
                <label>
                    url:
                    <input
                        type="text"
                        value={newBlog.url}
                        onChange={({ target }) => { setNewBlog({ ...newBlog, url: target.value }) }}
                    ></input>
                </label>
                <button type="submit">Create</button>
            </form>
        </>
    )
}
export default BlogForm