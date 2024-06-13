const express = require('express');
const server = express();
const router = require('./router/user-router');
const connectDb = require("./Utils/db");
require("dotenv").config()
const cors = require("cors")
const corsoptions={
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE,FATCH,HEAD",
    Credentials:true
}
server.use(cors(corsoptions))
// Middleware to parse JSON bodies
server.use(express.json());

// Router setup
server.use('/user', router);



server.get('/', (req, res) => {
    res.json({ msg: "Hello" });
});

connectDb().then(() => {
    server.listen(5000, () => {
        console.log("Server started");
    });
});

