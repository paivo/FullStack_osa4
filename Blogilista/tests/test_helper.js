
const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'kuku',
    author: 'kuki',
    url: 'www.w.com',
    likes: 10
  },
  {
    title: 'kukkuuuu',
    author: 'kukiuu',
    url: 'www.wuuu.com',
    likes: 11
  }
]
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
  
  module.exports = {
    initialBlogs, blogsInDb
  }