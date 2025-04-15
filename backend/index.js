const connectToMongo = require('./database')
const express = require('express')
const app = express()
const port = 5000

connectToMongo();

app.use(express.json())  // if you use request body

const Studentroutes = require('./routes/Student'); 
const Teacherroutes = require('./routes/Teacher'); 
const Adminroutes = require('./routes/Admin'); 


app.use('/api/Student',Studentroutes)
app.use('/api/Teacher',Teacherroutes)
app.use('/api/Admin',Adminroutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

