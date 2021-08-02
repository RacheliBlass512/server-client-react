const express = require('express');


const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/books',require('./books.js'));
app.use('/users',require('./users.js'));

app.listen(27017, () => {
    console.log('server run');
});
