import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import db from './config/Database.js';
import userRoute from './routes/UserRoute.js';
import profileRoute from './routes/ProfileRoute.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(profileRoute);
app.use(userRoute);

try {
  await db.authenticate();
  console.log('Database Connected');
} catch (error) {
  console.error(error);
}

app.listen(5000, () => console.log('Server Run on port 5000'));
