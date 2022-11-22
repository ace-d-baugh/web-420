// Title: baugh-session-routes.js
// Author: Ace Baugh
// Date: November 22, 2022
// Description: API routes for the users collection

// require express
const express = require('express');
// require User
const User = require('../models/baugh-user');
// require bcrypt
const bcrypt = require('bcryptjs');
// router variable
const router = express.Router();

// Password encryption number
const saltRounds = 10;

/**
 * signUp
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - signup
 *     name: signUp
 *     description: API for creating a new user
 *     summary: Creates a new user 
 *     requestBody:
 *       description: signup information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *              - userName
 *              - password
 *              - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered User
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/signup', async(req, res) => {
   try {
      // find the user by username
      User.findOne({'userName': req.body.userName}, function (err, user) {
         // if there is an error
         if (err) {
            console.log(err);
            res.status(501).send({
               'message': `MongoDB Exception: ${err}`
            });
         } else if (!user) {
            // if the user is not found save the user
            const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
            const newRegisteredUser = {
               userName: req.body.userName,
               password: hashedPassword,
               emailAddress: req.body.emailAddress,
            };

            // register a new user
            User.create(newRegisteredUser, function (err, user) {
               if (err) {
                  console.log(err);
                  res.status(501).send({
                     'message': `MongoDB Exception: ${err}`
                  });
               } else {
                  // if the user is created console log the user
                  console.log(user);
                  res.json(user);
               }
            })
         } else {
            res.status(401).send({
               'message': `Username is already in use`
            });
         }
      });
   } catch (e) {
      console.log(e);
      res.status(500).send({
         'message': `Server Exception: ${e.message}`
      });
   }
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - login
 *     name: login
 *     description: API for logging in a user
 *     summary: Logs in a user
 *     requestBody:
 *       description: login information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered User
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async (req, res) => {
   try {
      // find the user by username
      User.findOne({'userName': req.body.userName},
      function (err, user) {
         // if there is an error
         if (err) {
            console.log(err);
            res.status(501).send({
               'message': `MongoDB Exception: ${err}`
            });
         } else {
            // if the user is found Check the password
            if (user) {
               let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
               
               if (passwordIsValid) {
                  res.json(user);
               } else {
                  res.status(401).send({
                     'message': `Invalid username and/or password`
                  });
               }
            } else {
               res.status(401).send({
                  'message': `Invalid username and/or password`
               });
            }
         }
      });
   } catch (e) {
      console.log(e);
      res.status(500).send({
         'message': `Server Exception: ${e.message}`
      });
   }
});

// export default function
module.exports = router;

