var express = require('express');
var router = express.Router();
// import Book model
const Book = require('../models/').Book;
/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}



/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  //  res.render('index', { title: 'Express' });
  const books = await Book.findAll();
  res.json({ books })
}));

module.exports = router;
