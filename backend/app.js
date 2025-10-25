/**
 * @fileoverview Main Express app setup
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const routes = require('./routes');
// const setupSwagger = require('./swagger');


const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5173'}));

// Swagger Docs
// setupSwagger(app);


// Routes
app.use('/api', routes);

// Connect DB and start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});