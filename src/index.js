require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Import routes
const routes = require('./routes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
	console.log(`API available at http://localhost:${port}/api`);
});


