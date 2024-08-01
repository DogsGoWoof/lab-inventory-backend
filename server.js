const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const reagentsRouter = require('./controllers/reagents');
const equipmentsRouter = require('./controllers/equipments.js');
const PORT = process.env.PORT ? process.env.PORT: 3000;

const app = express();

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  

app.use(cors());
app.use(express.json());

app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/reagents', reagentsRouter);
app.use('/equipments', equipmentsRouter);

app.listen(PORT, () => {
    console.log('The express app is ready!');
});