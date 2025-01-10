const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors())

app.get('/', (req,res) => {
    res.send('Express + TypeScript Server says Hello!');
});

app.listen(port, () => {
    console.log(`[server]: Server is listening at http://localhost:${port}`);
});
