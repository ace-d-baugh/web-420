// Title: baugh-composer.js
// Author: Ace Baugh
// Date: November 10, 2022
// Description: 

// require mongoose
const mongoose = require('mongoose');

// Create a new Mongoose schema
const Schema = mongoose.Schema;

// Create a new schema for the baugh-composer collection
const composerSchema = new Schema({
   firstName: { type: String },
   lastName: { type: String },
});

// export Composer
module.exports = mongoose.model('Composer', composerSchema);