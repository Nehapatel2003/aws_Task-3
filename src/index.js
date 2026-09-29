const path = require("path");
require('dotenv').config({
    path: path.join(__dirname, "../.env")
});

const express = require('express');
const cookieParser = require('cookie-parser')

const pool = require("./Config/db_Connection");
const userRouter = require('./Routes/user_Route');
const documentRouter = require('./Routes/document_Routes')
const router = require("./Routes/health_Route");
const {errHandling} = require('./Middleware/error_Handling')
const sendLog = require('../src/Utils/logger')
 
const loggingMiddleware = require("./Middleware/loggerMiddleware")

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(loggingMiddleware)

app.use("/", userRouter);
app.use("/",documentRouter);
app.use("/",router);


app.use(errHandling)


app.listen(process.env.PORT, async() => {
    console.log(`Server is running on port : ${process.env.PORT}`);
    await sendLog({
        level: "INFO",
        message: `Server is running on port ${process.env.PORT}`,
        route: null,
        statusCode: 200,
        duration: 0});
});