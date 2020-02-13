const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'kikii',
    author: 'kik',
    url: 'www.wee.com',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain(
    'kikii'
  )
})

test('a blog without defining likes can be added ', async () => {
  const newBlog = {
    title: 'kikkkki',
    author: 'kikkk',
    url: 'www.weello.com',
    likes: null
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[response.body.length-1].likes).toBe(0)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.content)
})

afterAll(() => {
  mongoose.connection.close()
})

test('a blog can be edited', async () => {
const newBlog = {
    title: 'kuku',
    author: 'kuki',
    url: 'www.w.com',
    likes: 100
}
const blogsAtStart = await helper.blogsInDb()
const blogToEdit = blogsAtStart[0]

await api
.put(`/api/blogs/${blogToEdit.id}`)
.send(newBlog)
.expect(200)
.expect('Content-Type', /application\/json/)

const blogsAtEnd = await helper.blogsInDb()

expect(blogsAtEnd[0].likes).toBe(newBlog.likes)
})

test('a blog without defining url or title cant be added ', async () => {
    const newBlog = {
      title: 'kiiik',
      author: 'kekku',
      url: null,
      likes: 1
    }
    const newBlog2 = {
        title: null,
        author: 'kuukeli',
        url: 'www.weello.com',
        likes: 1
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})