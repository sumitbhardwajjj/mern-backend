const morgan = require("morgan");
const productRouter = require("./routes/routes");
const userRouter = require('./routes/users')
const authController = require("./routes/auth")
const express = require("express");
const path = require('path')
const server = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const JWT = require('jsonwebtoken')


server.use(cors())
server.use(morgan("dev"));
server.use(express.static(path.resolve(__dirname,'build')));

server.get('/',(req,res)=>{
  res.json("Hello World")
})

const auth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  const token = authHeader.split('Bearer ')[1];


  try {
      const decoded = JWT.verify(token, process.env.SECRET);
      
      if (decoded.email) {
          next();
      } else {
          res.sendStatus(401);
      }
  } catch (err) { 
          return res.sendStatus(401);    
  }
}


server.use(express.json());
server.use(express.urlencoded());
server.use("/products", auth, productRouter.router);
server.use("/users", auth , userRouter.routers);
server.use('/signup',authController.route)
server.use('*',(req,res)=>{
  res.sendFile( path.resolve(__dirname,'build','index.html'))
})

dotenv.config()

const connect = async () =>{
  try {
      await mongoose.connect(process.env.MONGO);
      console.log("connected to mongodb")
    } catch (error) {
      throw error
    }
};

const Port = 6001

server.listen(Port, () => {
  console.log("server is running on port 8080");
  connect()
});

