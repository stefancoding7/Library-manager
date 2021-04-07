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

// redirect page to "/books" if route "/"
router.get('/', (req, res) => {
  res.redirect('/books')
})

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  //  res.render('index', { title: 'Express' });
  const books = await Book.findAll();
  res.json({ books })
  
}));


/*Get all books */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books });
}));

/*GET Create Book page */
router.get('/books/new-book', asyncHandler(async (req, res) => {
  res.render('new-book');
}));

/*POST create book*/
router.post('/books/new-book', asyncHandler(async (req, res) => {
  let book;

  try {
    book = await Book.create(req.body);
    res.redirect('/books');
  } catch (error) {
   
    if(error.name === "SequelizeValidationError") { // checking the error
      
      res.render("new-book", { book, errors: error.errors, check: req.body})
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }  
  }
}));

/* Show book detail form */
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  res.render('update-book', { book });
}));

/* POST update book */
router.post('/books/:id', asyncHandler(async (req, res) => {
  const bookc = await Book.findByPk(req.params.id);
  await bookc.update(req.body);
  res.redirect("/books");
}));

/*DELETE book from DB */
router.post('/books/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/books");
}));

router.get('/', (req, res) => {
  res.redirect('/books')
});

module.exports = router;
