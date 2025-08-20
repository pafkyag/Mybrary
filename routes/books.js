const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// All Books Route
router.get('/', (req, res) => {
  res.render('books/index')
})

// New Book Route
router.get('/new', (req, res) => {
  res.render('books/new', { book: new Book() })
})

// Create Book Route
router.post('/', (req, res) => {
  res.send(req.body.name)
})

module.exports = router