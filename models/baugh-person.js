// Title: baugh-person.js
// Author: Ace Baugh
// Date: November 16, 2022
// Description: MongoDB model for the people collection

// require mongoose
const mongoose = require('mongoose');

// Create a new Mongoose schema
const Schema = mongoose.Schema;

// Create a new schema for the people collection
const roleSchema = new Schema({
	text: { type: String }
});

// Create a new schema for the people collection
const dependentSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String }
});

// Create a new person schema for the people collection with nested roles and dependent schema
const personSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	roles: [roleSchema],
	dependents: [dependentSchema],
	birthDate: { type: String }
});

// export Person
module.exports = mongoose.model('Person', personSchema);
