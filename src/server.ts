import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';
const express = require('express');
const readme = require('readmeio');

dotenv.config();

mongoose.connect(process.env.DATABASE_URL as string).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.log('Error connecting to database', error);
});

const app = express();
const PORT = process.env.PORT || 1818;

app.use((req, res, next) => {
    readme.log(process.env.README_KEY, req, res, {
        // User's API Key
        apiKey: 'owlbert-api-key',
        // Username to show in ReadMe's dashboard
        label: 'Owlbert',
        // User's email address
        email: 'owlbert@example.com',
    });
    return next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
