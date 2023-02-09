const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
    // t
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(b => b.title)
        expect(titles).toContain('Second Blog')
    })
})

describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNoneExistId = await helper.nonExistingId()
        await api
            .get(`/api/blogs/${validNoneExistId}`)
            .expect(404)
    })

    test('fails with statuscode 400 if id is not valid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'
        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new note', () => {
    // t
    test('succeeds with valid data', async () => {
        const user = {
            username: 'mluukkai',
            password: 'salainen'
        }
        // const token = await api.get('/api/login').send(user)

        // console.log('token', token)
        //     const newBlog = {
        //         title: 'Third Blog',
        //         author: 'TBJ',
        //         url: 'www.TBJ.com',
        //         likes: 13
        //     }

        //     await api
        //         .post('/api/blogs')
        //         .send(newBlog)
        //         .expect(201)
        //         .expect('Content-Type', /application\/json/)

        //     const blogsAtEnd = await helper.blogsInDb()
        //     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        //     const titles = blogsAtEnd.map(b => b.title)
        //     expect(titles).toContain('Third Blog')
    })

    // t
    test('default likes is 0', async () => {
        const newBlog = {
            title: 'Third Blog',
            author: 'TBJ',
            url: 'www.TBJ.com'
        }

        const savedBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(savedBlog.body.likes).toEqual(0)
    })

    test('blog without title is not added', async () => {
        const newBlog = {
            author: 'HJS',
            url: 'www.HJS.com',
            likes: 6
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('blog without url is not added', async () => {
        const newBlog = {
            title: 'Third Blog',
            author: 'HJS',
            likes: 6
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a note', () => {
    // t
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(b => b.titles)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('update of a note', () => {
    test('succeeds with updated likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const likesAtStart = blogToUpdate.likes
        console.log('likesAtStart', likesAtStart)
        const newLikes = likesAtStart + 2

        const newBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: newLikes
        }

        const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)

        expect(response.body.likes).toBe(newLikes)

        // await api
        //     .delete(`/api/blogs/${blogToDelete.id}`)
        //     .expect(204)

        // const blogsAtEnd = await helper.blogsInDb()

        // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        // const titles = blogsAtEnd.map(b => b.titles)

        // expect(titles).not.toContain(blogToDelete.title)
    })
})

// 4.9
test('a blog has a unique property named id', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => expect(blog.id).toBeDefined())
})


afterAll(async () => {
    await mongoose.connection.close()
})