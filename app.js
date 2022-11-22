/* ============================================
; Title: Assignment 1.2 - app.js
; Author: Ace Baugh
; Start Date: 10/17/2022
; Description: WEB 420 app.js swagger setup
============================================ */

// Require statements
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const composerApi = require('./routes/baugh-composer-routes');
const personApi = require('./routes/baugh-person-routes');
const sessionApi = require('./routes/baugh-session-routes');

// App object
const app = express();

// Port
const port = process.env.PORT || 3000;

// Use JSON
app.use(express.json());

// Use URL encoded
app.use(express.urlencoded({ extended: true }));

/**
 * MongoDB Atlas connection string
 */
const conn = 'mongodb+srv://web420_user:s3cret@buwebdev-cluster-1.9wmv0d7.mongodb.net/web420DB?retryWrites=true&w=majority';
mongoose
	.connect(conn, {
		promiseLibrary: require('bluebird'),
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log(`Connection to web420DB on MongoDB Atlas successful`);
		console.log('');
	})
	.catch((err) => {
		console.log(`MongoDB Error: ${err.message}`);
	});

// Swagger options
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Web 420 RESTFul APIs',
			version: '1.0.0',
		},
	},
	apis: ['./routes/*.js'],
};

// Swagger specs
const openapiSpecification = swaggerJsdoc(options);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Routes
app.use('/api', composerApi);
app.use('/api', personApi);
app.use('/api', sessionApi);

// Routes
app.get('/', (req, res) => {
	res.send('Welcome to the Web 420 RESTful APIs');
});

// Create server
http.createServer(app).listen(port, () => {
	console.log(`Application started and listening on port: ${port}`);
});
