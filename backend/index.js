const connectToMongo = require('./database')
const express = require('express')
const cors = require('cors');

const app = express()
const port = 5000

connectToMongo();

app.use(express.json())  // if you use request body
app.use(cors()); // Allow frontend to access backend

const Studentroutes = require('./routes/Student'); 
const Teacherroutes = require('./routes/Teacher'); 
const Adminroutes = require('./routes/Admin'); 
const Courseroutes = require('./routes/Course')


app.use('/api/Student',Studentroutes)
app.use('/api/Teacher',Teacherroutes)
app.use('/api/Admin',Adminroutes)
app.use('/api/Course',Courseroutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

