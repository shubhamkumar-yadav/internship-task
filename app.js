const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(express.json());
app.listen(3000);


const userRouter = require('./loginAndsignup/routes/userRouter.js');

app.use('/user',userRouter);
