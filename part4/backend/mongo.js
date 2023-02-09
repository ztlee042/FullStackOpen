require('dotenv').config()
const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

const url = process.env.TEST_MONGODB_URL

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'Second Blog',
    author: 'HJS',
    url: 'www.HJS.com',
    likes: 6
})

blog.save().then(() => {
    console.log('blog saved!')
    mongoose.connection.close()
})


// Blog.find({}).then(result => {
//     result.forEach(blog => {
//         console.log(blog)
//     })
//     mongoose.connection.close()
// })