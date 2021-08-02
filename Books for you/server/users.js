const MongoClient = require('mongodb').MongoClient
const express = require('express');
const nodemailer = require('nodemailer');
const validat = require('./validation')

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let router = express.Router()

const connectionString = "mongodb+srv://booksForYou:Rach0000@cluster0.drwib.mongodb.net/BooksForYou?retryWrites=true&w=majority"


let db;
let users;

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected')
    db = client.db('BooksForYou')
    users = db.collection('users')
})

const sendMail = (userMail, name) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'racheli.server@gmail.com',
            pass: 'Rach0000'
        }
    });

    var mailOptions = {
        from: 'racheli.server@gmail.com',
        to: userMail,
        subject: 'Welcome to Books For You',
        html: '<h3>Hello ' + name + '</h3><p>We here at Books For You wish you a pleasant and enlightening shopping experience</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

router.get('/getCart/:id', (req, res) => {
    users.findOne({ id: req.params.id })
        .then(user => {
            if (user) {
                return res.send(user.cart)
            }
            else {
                return res.send({ error: 'not valid id' })
            }
        })
})

router.post('/addUser', (req, res) => {
    let error = validat.validat(req.body)
    if (error != 'valid') {
        return res.send(error)
    }
    else {
        users.findOne({ id: req.body.id })
            .then(user => {
                if (user !== null) {
                    return res.send('exist this id, try another')
                }
                else {
                    sendMail(req.body.email, req.body.fullName)
                    users.insertOne(req.body)
                        .then(() => { return res.send('ok') })
                        .catch(err => { console.error(err); })
                }
            })
    }

})

router.put('/editUser', (req, res) => {
    users.findOneAndUpdate(
        { id: req.body.id },
        {
            $set: req.body
        },
        {
            upsert: true
        }
    )
        .then(() => { return res.send("ok") })
        .catch(error => console.error(error))
})

router.post('/logIn', (req, res) => {
    users.findOne({ id: req.body.id })
        .then(userWithId => {
            if (userWithId != null) {
                if (userWithId.password == req.body.password) {
                    return res.send(userWithId)
                }
                else {
                    return res.send({ error: 'Id not match the password' })
                }
            }
            else {
                res.send({ error: 'not exist id' })
            }
        })
        .catch(err => console.error(err))
})

router.put('/addProductToUser', (req, res) => {

    let newProduct = req.body.elementToAdd;
    newProduct.sum = 0;
    users.findOneAndUpdate(
        { id: req.body.id, "cart.id": { $ne: req.body.elementToAdd.id } },
        {
            $push: { cart: newProduct },
        }
    )

    users.findOneAndUpdate(
        { id: req.body.id, "cart.id": req.body.elementToAdd.id },
        {
            $inc: {
                sumItems: 1,
                sumPrice: req.body.elementToAdd.price,
                'cart.$.sum': 1
            }
        }
    )
        .then(() => { return res.send("ok") })
        .catch(error => { console.error(error) })
})

router.put('/deleteOneProductToUser', (req, res) => {
    users.find({ id: req.body.id, "cart.id": req.body.elementToDelete.id }).forEach(function (doc) {
        let elementDetailsFromServer = doc.cart.find(x => x.id == req.body.elementToDelete.id)
        doc.sumPrice -= elementDetailsFromServer.price
        doc.cart.find(x => x.id == req.body.elementToDelete.id).sum -= 1;
        doc.sumItems -= 1;
        users.save(doc);
    })
        .then(() => { return res.send("ok") })
        .catch(error => console.error(error))
})

router.put('/deleteAllInstancesProductToUser', (req, res) => {
    users.find({ id: req.body.id, "cart.id": req.body.elementToDelete.id }).forEach(function (doc) {
        let elementDetailsFromServer = doc.cart.find(x => x.id == req.body.elementToDelete.id)
        doc.sumPrice -= elementDetailsFromServer.price * elementDetailsFromServer.sum
        doc.cart = doc.cart.filter(elem => elem.id != req.body.elementToDelete.id)
        doc.sumItems -= elementDetailsFromServer.sum;
        users.save(doc);
    })
        .then(() => { return res.send("ok") })
        .catch(error => console.error(error))
})
module.exports = router;