// Title: baugh-teams.js
// Author: Ace Baugh
// Date: December 14, 2022
// Description: MongoDB model for the teams collection

// Require statements
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schemas
const playersSchema = new Schema({
   firstName: { type: String },
   lastName: { type: String },
   salary: { type: Number },
});

// Create a new schema for the teams collection
const teamSchema = new Schema({
   name: { type: String },
   mascot: { type: String },
   players: [playersSchema],
});

// Export Team
module.exports = mongoose.model('Team', teamSchema);