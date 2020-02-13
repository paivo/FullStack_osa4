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
  const likes = blogs.map(blog => blog.likes)
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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}