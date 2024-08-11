import express from 'express';
import bodyParser from 'body-parser';
import dbConnector from './db/connection.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => {
    dbConnector();
    console.log(`Server is running on port ${port}`);
});

