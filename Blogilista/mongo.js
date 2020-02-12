const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
    `mongodb+srv://pave:${password}@cluster0-wzsgm.mongodb.net/blog-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

if ( process.argv.length<4 ) {
    console.log('blog: ')
    Blog.find({}).then(result => {
        result.forEach(blog => {
            console.log(blog.title+' '+blog.author+' '+blog.url+' '+blog.likes)
        })
        mongoose.connection.close()
    },
)} else {
    
    const blog = new Blog({
        title: process.argv[3],
        author: process.argv[4],
        url: process.argv[5],
        likes: process.argv[6],
    })

    blog.save().then(response => {
        console.log('blog saved!')
        mongoose.connection.close()
    })
}
