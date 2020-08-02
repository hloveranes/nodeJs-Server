// Express is a minimal and flexible Node.js web application framework 
// that provides a robust set of features for web and mobile applications. 
const express = require('express');
const app = express();
const port = 3000;
// import .env file
const dotenv = require('dotenv');
// Use to connect
const mongoose = require('mongoose');
// Import routes
const authRoute = require('./routes/auth');


// start env
dotenv.config();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to db!");
});


// Middleware
app.use(express.json());

// Route Middleware
// app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/user', authRoute);

// This app starts a server and listens on port 3000 for connections.
app.listen(port, () => console.log(`app listening at http://localhost:${port}`));





