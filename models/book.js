const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Book', bookSchema)