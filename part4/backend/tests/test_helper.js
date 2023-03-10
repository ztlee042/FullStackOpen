const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'First Blog',
        author: 'ABC',
        url: 'www.ABC.com',
        likes: 6
    },
    {
        title: 'Second Blog',
        author: 'HJS',
        url: 'www.HJS.com',
        likes: 6
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'Test Blog', url: 'www.test.com' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const nonExistingToken = async (token) => {
    let invalidToken = token.split('')
    invalidToken[3] = 'h'
    return invalidToken.join('')
}



module.exports = {
    initialBlogs, blogsInDb, nonExistingId, usersInDb, nonExistingToken
}