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


const app = express();

// MongoDB connection with error handling
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const corsOptions = {
    origin: 'https://labstocker.netlify.app', // Specify the allowed origin
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, // Include this if you're handling cookies or authentication
    optionsSuccessStatus: 204 
  };
  
  // Use the CORS middleware
  app.use(cors(corsOptions));


// Middleware
// app.use(cors());
app.use(express.json());

// Routes go here
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/reagents', reagentsRouter);
app.use('/equipments', equipmentsRouter);

app.listen(3000, () => {
    console.log('The express app is ready!');
});