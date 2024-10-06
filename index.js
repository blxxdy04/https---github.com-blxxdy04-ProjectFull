const express = require('express');
const userRouter = require('./routes/user');
const connectDb = require('./lib/connect');

const app = express();
app.use(express.json());

app.use(userRouter);

console.log(process.env.DB_URL)

app.listen(3000, () => {
    connectDb();
    console.log('server is running on http://localhost:3000');
});