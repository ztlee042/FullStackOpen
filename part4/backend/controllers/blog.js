const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/info', async (request, response) => {
    const blog_count = await Blog.count()
    const body = `
        <p>Phonebook has info for ${blog_count} people</p>
        <p>${new Date()}</p>
        `
    response.send(body)
})


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        response.status(404).json({ error: 'blog id invalid' })
    }
    response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    if (!request.user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    const user = blog.user.toString()
    if (user === request.user) {
        blog.remove()
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'token invalid' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedBlog)
})

blogsRouter.post('/', async (request, response) => {
    let { title, author, url, likes } = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    console.log('user', user)

    if (title === undefined || url === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }
    if (likes === undefined) {
        likes = 0
    }

    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

module.exports = blogsRouter