import express from 'express';
import bodyParser from 'body-parser';
import env from "dotenv";

const app = express();
const port = 3000;

env.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

