import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';
// import routes from './routes/user';

dotenv.config();

mongoose.connect(process.env.DATABASE_URL as string).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.log('Error connecting to database', error);
});

const app = express();
const PORT = process.env.PORT || 1818;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
