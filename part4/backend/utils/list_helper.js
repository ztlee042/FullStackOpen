const lodash = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        const likes = blogs.map(d => d.likes)
        const initialCount = 0
        return likes.reduce((accum, current) => accum + current, initialCount)
    }
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(d => d.likes)
    const maxLike = Math.max(...likes)
    const favoriteBlog = blogs.filter(d => d.likes === maxLike)[0]
    delete favoriteBlog.url
    delete favoriteBlog.__v
    delete favoriteBlog._id
    return favoriteBlog
}

const mostBlogs = (blogs) => {
    const authors = lodash.countBy(blogs, 'author')
    const maxCount = Math.max(...Object.values(authors))
    const maxAuthor = lodash.pickBy(authors, (value, key) => {
        return lodash.isEqual(maxCount, value)
    })
    const author = Object.keys(maxAuthor)[0]
    const count = Object.values(maxAuthor)[0]
    const result = {
        author: author,
        blogs: count
    }
    return result
}

const mostLikes = (blogs) => {
    const likes = blogs.map(d => d.likes)
    const maxLike = Math.max(...likes)
    const favoriteBlogAuthor = blogs.filter(d => d.likes === maxLike)[0].author
    const filteredBlogs = lodash.filter(blogs, b => b.author === favoriteBlogAuthor)
    const favTotalLikes = totalLikes(filteredBlogs)
    const mostLikedAuthor = {
        author: favoriteBlogAuthor,
        likes: favTotalLikes
    }
    return mostLikedAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}