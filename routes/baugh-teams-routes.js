// Title: baugh-teams-routes.js
// Author: Ace Baugh
// Date: December 14, 2022
// Description: API routes for the baugh-teams collection

// Require statements
const express = require('express');
const Team = require('../models/baugh-teams');

// Create router variable
const router = express.Router();

// Create a new team
/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     description: API for creating a new team document
 *     summary: Creates a new team
 *     requestBody:
 *       description: Team information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - mascot
 *               - players
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *               players:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     salary:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Team added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/teams', async (req, res) => {
   try {
      // Create a new team document
      const newTeam = {
         name: req.body.name,
         mascot: req.body.mascot,
         players: req.body.players,
      };
      // Create a new team document 
      Team.create(newTeam, function(err, team) {
         if (err) {
            console.log(err);
            res.status(501).send({
               message: `MongoDB Exception: ${err}`
            });
         } else {
            console.log(team);
            res.json(team);
         }
      });
   } catch (e) {
      console.log(e);
      res.status(500).send({
         message: `Server Exception: ${e.message}`
      });
   }
});


// find All Teams
/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning a list of teams from MongoDB Atlas
 *     summary: returns a list of team documents
 *     responses:
 *       '200':
 *         description: Team documents
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
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

// assign a player to a team
/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     description: API for assigning a player to a team
 *     summary: assigns a player to a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team ID of the team
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Player ID of the player
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player assigned to team
 *       '401':
 *         description: Invalid team ID
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.post('/teams/:id/players', async (req, res) => {
   try {
      const teamId = req.params.id;
      const newPlayer = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         salary: req.body.salary
      };
      Team.findOneAndUpdate( { _id: teamId }, { $push: { players: newPlayer } }, { new: true }, function(err, team) {
         if (err) {
            console.log(err);
            res.status(401).send({
               message: `Invalid team ID: ${err}`
            });
         } else {
            console.log(team);
            res.json(team);
         }
      });
   } catch (e) {
      console.log(e);
      res.status(500).send({
         message: `Server Exception: ${e.message}`
      });
   }
});

// find all player by teamId
/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning a list of players by teamId from MongoDB Atlas
 *     summary: returns a list of player documents
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team ID of the team
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Player documents
 *       '401':
 *         description: Invalid team ID
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/teams/:id/players', async (req, res) => {
   try {
      const teamId = req.params.id;

      Team.findOne({ '_id': teamId }, function (err, team) {
         if (err) {
            console.log(err);
            res.status(401).send({
               message: `Invalid team ID: ${err}`
            });
         } else {
            console.log(team.players);
            res.json(team.players);
         }
      });
   } catch (e) {
      console.log(e);
      res.status(500).send({
         message: `Server Exception: ${e.message}`
      });
   }
});

// delete team by teamID
/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     description: API for deleting a team by teamId from MongoDB Atlas
 *     summary: deletes a team document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team ID of the team requested by the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document deleted
 *       '401':
 *         description: Invalid team ID
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.delete('/teams/:id', async (req, res) => {
   try {
      const teamId = req.params.id;

      Team.findOneAndDelete({ '_id': teamId }, function (err, team) {
         if (err) {
            console.log(err);
            res.status(401).send({
               message: `Invalid team ID: ${err}`
            });
         } else {
            console.log(team);
            res.json(team);
         }
      });
   } catch (e) {
      console.log(e);
      res.status(500).send({
         message: `Server Exception: ${e.message}`
      });
   }
});

module.exports = router;