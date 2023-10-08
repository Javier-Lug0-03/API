const express = require('express')
const dotenv = require('dotenv')
dotenv.config();

const app = express()
const port = process.env.PORT || 2000;
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(require('./router.js'))

app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`)
})