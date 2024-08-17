const express = require('express')
const bodyParser = require('body-parser')
const books = [{
        bookId: 1,
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookId: 2,
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
]

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/views'));

// Publish the initial book data
app.get("/", function (req, res) {
    res.render("index", {
        data: books
    })
})

// Add a new book
app.post("/", (req, res) => {
    const inputBookId = req.body.bookId
    const inputBookName = req.body.bookName
    const inputBookAuthor = req.body.bookAuthor
    const inputBookPages = req.body.bookPages
    const inputBookPrice = req.body.bookPrice

    books.push({
        bookId: inputBookId,
        bookName: inputBookName,
        bookAuthor: inputBookAuthor,
        bookPages: inputBookPages,
        bookPrice: inputBookPrice,
        bookState: "Available"
    })

    res.render("index", {
        data: books
    })
})

// Issue the book
app.post('/issue', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Issued";
        }
    })
    res.render("index", {
        data: books
    })
})

// Return the book
app.post('/return', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Available";
        }
    })
    res.render("index", {
        data: books
    })
})

// Delete the book
app.post('/delete', (req, res) => {
    var requestedBookName = req.body.bookName;
    var j = 0;
    books.forEach(book => {
        j = j + 1;
        if (book.bookName == requestedBookName) {
            books.splice((j - 1), 1)
        }
    })
    res.render("index", {
        data: books
    })
})

// Update the book
app.post('/update', (req, res) => {
    const inputBookId = req.body.bookId
    const inputBookName = req.body.bookName
    const inputBookAuthor = req.body.bookAuthor
    const inputBookPages = req.body.bookPages
    const inputBookPrice = req.body.bookPrice

    var isExist = false

    var j = 0;
    books.forEach(book => {
        j = j + 1;
        if (book.bookId == inputBookId) {
            isExist = true
            book.bookName = inputBookName
            book.bookAuthor = inputBookAuthor
            book.bookPages = inputBookPages
            book.bookPrice = inputBookPrice            
        }
    })

    if (!isExist)
    {
        books.push({
            bookId: inputBookId,
            bookName: inputBookName,
            bookAuthor: inputBookAuthor,
            bookPages: inputBookPages,
            bookPrice: inputBookPrice,
            bookState: "Available"
        })
    }

    res.render("index", {
        data: books
    })
})

app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
})
