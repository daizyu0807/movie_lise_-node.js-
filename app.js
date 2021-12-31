const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const res = require('express/lib/response')
const movies = require('./movies.json')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movies: movies.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movieList = movies.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  console.log(movieList)
  res.render('index', { movies: movieList, keyword:keyword })
})


app.get('/movies/:movie_id', (req, res) => {
  const movie = movies.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})