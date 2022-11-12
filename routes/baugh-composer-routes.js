// Title: baugh-composer-routes.js
// Author: Ace Baugh
// Date: November 10, 2022
// Description:

// require express
const express = require('express');
// require Composer
const Composer = require('../models/baugh-composer');

// create router variable
const router = express.Router();

// find all composers
/* 
OpenAPI 3.0.0 
   get:
      tags:
      - Composers
      summary: returns a list of composer documents
      description: API for returning a list of composers from MongoDB Atlas
      responses:
      '200':
         description: Composer documents
      '500':
         description: Server Exception
      '501':
         description: MongoDB Exception
*/
router.get('/composers', async (req, res, next) => {
	try {
		const composers = await Composer.find({});
		res.json(composers);
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Exception');
		res.status(501).send('MongoDB Exception');
	}
});

// find one composer by id
/*
OpenAPI 3.0.0
get:
      tags: 
      - Composers
      summary: returns a composer document
      description: API for returning a single composer object from MongoDB
      parameters:
      - name: id
         in: path
         required: true
         description: The composerId requested by the user
         schema:
            type: string
      responses:
      '200':
         description: Composer document in JSON format
      '500':
         description: Server Exception
      '501':
         description: MongoDB Exception
*/
router.get('/api/composers/:id', async (req, res, next) => {
	try {
		const composer = await Composer.findOne({ _id: req.params.id });
		if (!composer) {
			console.log('Composer not found');
			res.status(404).send('Composer not found');
		} else {
			console.log(composer);
			res.json(composer);
		}
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Exception');
		res.status(501).send('MongoDB Exception');
	}
});

// create a new composer document
/* 
OpenAPI 3.0.0
   post:
      tags:
      - Composers
      summary: Creates new composer object
      description: API for adding new composer objects
      requestBody:
      description: Composer's information
      content:
         application/json:
            schema:
            type: object
            description: composer object
            required:
               - firstName
               - lastName
            properties:
               firstName:
                  description: composer's first name
                  type: string
               lastName:
                  description: composer's last name 
                  type: string
      responses:
      '200':
         description: Composer added
      '500':
         description: Server Exception
      '501':
         description: MongoDB Exception
*/
router.post('/api/composers', async (req, res, next) => {
	try {
		const composer = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		};

		await Composer.create(composer);
		res.json(composer);
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Exception');
		res.status(501).send('MongoDB Exception');
	}
});
