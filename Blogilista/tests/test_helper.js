const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
  
  module.exports = {
    initialBlogs, usersInDb, blogsInDb
  }