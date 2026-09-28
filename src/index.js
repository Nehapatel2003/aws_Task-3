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

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);
app.use("/",documentRouter);
app.use("/",router);

app.use(errHandling)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port : ${process.env.PORT}`);
});