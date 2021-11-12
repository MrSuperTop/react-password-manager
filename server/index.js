import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routers/auth.routes.js';
import credentialsRouter from './routers/credentials.routes.js';
import usersRouter from './routers/users.routes.js';

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config({ path: './.env.local' });

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/credentials', credentialsRouter);
app.use('/api/users', usersRouter);

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.on('error', () => {
  console.log('Could Not Connect to MongoDB');
});

connection.once('open', () => {
  console.log('MongoDB connection has been established successfully');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

mongoose.set('useFindAndModify', false);
