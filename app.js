console.clear()
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

import db from './config/db.js';
import router from './Routes/router.js';

db.connectDB();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/', router);

export default app;
