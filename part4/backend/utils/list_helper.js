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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}