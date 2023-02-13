const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const jwt = require('jsonwebtoken')



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
    console.log('res', response.json(blog))
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token) {
        response.status(401).json({ error: 'token missing' })
    }
    if (!request.user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    console.log('blog.user', blog.user)
    console.log('typeof blog.user', typeof blog.user)
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
    if (!request.user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    const user = blog.user.toString()
    if (user === request.user) {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            { title, author, url, likes },
            { new: true, runValidators: true, context: 'query' }
        )
        response.json(updatedBlog)
    } else {
        response.status(401).json({ error: 'token invalid' })
    }
})

blogsRouter.post('/', async (request, response) => {
    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid -> user missing' })
    }

    const user = await User.findById(request.user)
    const blog = new Blog({ ...request.body, user: user.id })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

module.exports = blogsRouter