const Blog = require('../models/blog')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}