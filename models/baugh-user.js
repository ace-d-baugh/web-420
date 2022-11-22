// Title: baugh-user.js
// Author: Ace Baugh
// Date: November 22, 2022
// Description: MongoDB model for the users collection

// Require statements
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schemas

// Create a new schema for the users collection
let userSchema = mongoose.Schema({
	userName: { type: String },
	password: { type: String },
	emailAddress: { type: String }
});

// Export User
module.exports = mongoose.model('User', userSchema);