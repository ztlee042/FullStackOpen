const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/info', (request, response) => {
    Blog.count().then(blog_count => {
        const body = `
        <p>Phonebook has info for ${blog_count} people</p>
        <p>${new Date()}</p>
        `
        response.send(body)
    })
})


blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            response.json(blog)
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const { title, author, url, likes } = request.body

    Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
    const { title, author, url, likes } = request.body

    if (title === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }

    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes
    })

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter