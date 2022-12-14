// Title: baugh-teams-routes.js
// Author: Ace Baugh
// Date: December 14, 2022
// Description: API routes for the baugh-teams collection

// Require statements
const express = require('express');
const Team = require('../models/baugh-teams');

// Create router variable
const router = express.Router();

// find All Teams
/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *    get:
 *      tags:
 *        - Teams
 *      description: API for returning a list of teams from MongoDB Atlas
 *      summary: returns a list of team documents
 *      responses:
 *        '200':
 *          description: Team documents
 *        '500':
 *          description: Server Exception.
 *        '501':
 *          description: MongoDB Exception.
 */
router.get('/teams', async (req, res) => { 
   try {
      Team.find({}, function(err, teams) {
            if (err) {
               console.log(err);
               res.status(501).send({
                  message: `MongoDB Exception: ${err}`
               });
            } else {
               console.log(teams);
               res.json(teams);
            }
      });
   } catch (e) {
      console.log(e);
      res.status(500).send({
            message: `Server Exception: ${e.message}`
      });
   }
});