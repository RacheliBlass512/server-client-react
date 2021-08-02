const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let router = express.Router()

const connectionString = "mongodb+srv://booksForYou:Rach0000@cluster0.drwib.mongodb.net/BooksForYou?retryWrites=true&w=majority"

let db;
let books;

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected')
    db = client.db('BooksForYou')
    books = db.collection('books')
})

router.get('/getAllBooks/:type', (req, res) => {
    books.find({type:req.params.type}).toArray()
        .then(booksArr => res.send(booksArr))
})

module.exports = router;
