const express = require('express');
const cors = require('cors');
const looger = require('morgan');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(looger('dev'));
app.use(cors());
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

module.exports = app;
