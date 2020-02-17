const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0
    ? 0 
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = ''
  let maximum = 0
  blogs.forEach(element => {
      if (element.likes > maximum) {
          favorite = element.title
          maximum = element.likes
      }
  });
  return favorite, maximum
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  let i = 0
  let maxindex = 0
  let maxcount = 0
  authors.forEach(author => {
    let count = 0
    blogs.forEach( blog => {
      if (author === blog.author) {
        count++
      }
    })
    if (count>maxcount) {
      maxcount = count
      maxindex = i
    }
    i++
  })
  return authors[maxindex], maxindex
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}