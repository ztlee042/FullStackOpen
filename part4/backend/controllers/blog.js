const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/info', async (request, response) => {
    const blog_count = await Blog.count()
    const body = `
        <p>Phonebook has info for ${blog_count} people</p>
        <p>${new Date()}</p>
        `
    response.send(body)
})


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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
    if (title === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }
    if (likes === undefined) {
        likes = 0
    }
    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter