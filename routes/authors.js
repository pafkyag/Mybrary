const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')  // 'i' here means not case sensitive
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', { authors: authors, searchOptions: req.query })
  } catch (error) {
    res.redirect('/') // redirect the user to the home page
  }
})

// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})

// Create Author Route
router.post('/', async (req, res) => {

  const author = new Author({
    name: req.body.name
  })

  try {
    const newAuthor = await author.save()
    //res.redirect(`authors/${newAuthor.id}`)
    console.log(newAuthor)
    res.redirect('authors')

  } catch (error) {

    res.render('authors/new', {  // here we pass back the author and the errorMessage
      author: author,
      errorMessage: 'Error creating Author'
    })
  }

  /*
  author.save((err, newAuthor) =>{
    if (err) {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }else{
      //res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`authors`)
    } 
  }) */

  /*
  author.save()
    .then ( (newAuthor) => {
      //res.redirect(`authors/${newAuthor.id}`)
      console.log(newAuthor)
      res.redirect('authors')
    })
    .catch ( (err) => {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    })*/

})

module.exports = router