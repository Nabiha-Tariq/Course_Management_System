const connectToMongo = require('./database')
const express = require('express')
const app = express()
const port = 5000

connectToMongo();

app.use(express.json())  // if you use request body

app.use('/api/Authentication', require('./routes/Authentication'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

