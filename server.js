const express = require('express')
const app = express()
const db = require('./db')
// const Person = require('./models/Person')
// const MenuItem = require('./models/MenuItem')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

app.get('/', function (req, res) {
    res.send('welcom to my hotels ...... how i can help you?')
})

app.get('/chicken', function (req, res) {
    res.send('sure sir, iwould love to serve chicken')
})

app.get('/about', function (req, res) {
    res.send('this is my contact no')
})




const personRutes = require('./routes/personRoutes');
app.use('/person',personRutes);


const menuItemRutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRutes);

const userRoutes = require('./routes/userRoutes');
app.use('/user',userRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT)