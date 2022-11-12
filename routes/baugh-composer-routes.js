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
@openapi
/api/composers:
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
router.get('/composers', async (req, res) => {
	try {
		Composer.find({}, function (err, composers) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(composers);
				res.json(composers);
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: `Server Exception: ${e.message}`,
		});
	}
});

// find one composer by id
/*
@openapi
/api/composers/{id}:
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
router.get('/composers/{:id}', async (req, res) => {
	try {
		Composer.findOne({ _id: req.params.id }, function (err, composer) {
			if (err) {
				console.log(err);
				res.status(500).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(composer);
				res.json(composer);
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: `Server Exception: ${e.message}`,
		});
	}
});

// create a new composer document
/* 
@openapi
/api/composers:
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
router.post('/composers', async (req, res) => {
	try {
		const newComposer = {
			type: req.body.type,
		};

		await Composer.create(newComposer, function (err, composer) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(composer);
				res.json(composer);
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: `Server Exception: ${e.message}`,
		});
	}
});
