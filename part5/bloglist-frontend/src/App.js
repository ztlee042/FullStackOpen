import { useState, useEffect, useRef } from "react"
import loginService from './services/login';
import blogService from "./services/blogs";
import Message from "./components/Message";
import ErrorMessage from "./components/ErrorMessage";
import Blog from "./components/Blog";
import LogInForm from './components/LoginForm'
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";



const App = () => {

    const [blogs, setBlogs] = useState([])
    const [userLogIn, setUserLogIn] = useState(null)
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUserLogIn(user)
            blogService.setToken(user.token)
            // blogService.setToken(user.token)
        }
    }, [])

    //#region message
    const setMessageContent = (content) => {
        setMessage(content)
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    const setErrorMessageContent = (content) => {
        setErrorMessage(content)
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000)
    }
    //#endregion message

    //#region log in
    const loginForm = () => (
        <Togglable buttonLabel="log in">
            <LogInForm
                userLogin={userLogin}
            />
        </Togglable>
    )

    const userLogin = async (userInfo) => {
        try {
            const user = await loginService.login(userInfo)
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            setMessageContent(`${user.name} logged in`)
            setUserLogIn(user)
            blogService.setToken(user.token)
        } catch (error) {
            setErrorMessageContent('Error')
        }
    }
    //#endregion log in

    //#region blog form
    const blogForm = () => (
        <>
            <p>{userLogIn.name} logged in <button>log out</button></p>
            <Togglable buttonLabel="create" ref={blogFormRef}>
                <BlogForm createNewBlog={createNewBlog}
                />
            </Togglable>
        </>

    )

    const createNewBlog = async (newBlogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const addedBlog = await blogService.createNew(newBlogObject)
            setMessageContent(`Added a new blog post: ${newBlogObject.title} by ${newBlogObject.author}`)
            setBlogs(blogs.concat(addedBlog))
        } catch (error) {
            setErrorMessageContent('Error!')
        }
    }

    //#endregion blog form

    const blogList = () => {
        blogs.sort((a, b) => a.likes < b.likes ? 1 : -1)
        // console.log('sortedBlogs', sortedBlogs)
        return (
            <>
                <h2> Blog List</h2>
                {blogs.map((blog, i) =>
                    <Blog key={blog.id} blog={blog} blogId={blog.id} />
                )}
            </>
        )
    }

    return (
        <>
            <h1> Blog App</h1>
            <Message message={message} />
            <ErrorMessage message={errorMessage} />
            {userLogIn ? <div>
                {blogForm()}
                {blogList()}
            </div> : loginForm()}
        </>

    )

}



export default App