const express = require ('express')
const cors = require ('cors');
const jwt = require ("jsonwebtoken");
const { db } = require('./db/db')
const {readdirSync} = require('fs')
const app = express()


require('dotenv').config()

const PORT = process.env.PORT

//Router principal
const generalRouter = require('./routes');
 //middlewares   
app.use(express.json())
app.use(cors())
app.use(generalRouter);

//routes
 readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

 //.get inicial para testeo
 app.get("/", (req, res) => {
    res.send({msg: "Hola"});
});



const server = () => {
    db()
    app.listen(PORT, () =>{
        console.log('listening to port:', PORT)
    })
}

server()