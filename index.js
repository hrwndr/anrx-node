require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json());

// Routes

// Products - showall, add a filter
// Product - create, read, update 
// Categories - show all, add a filter
// Category - create, read, update

const products = require('./routes/product')
const category = require('./routes/category')

app.use('/', products)
app.use('/', category)



app.get('/', (req, res) => {
    res.end('ANRX NODEJS TEST!')
})

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))