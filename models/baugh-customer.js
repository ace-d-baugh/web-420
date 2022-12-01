// Title: baugh-customer.js
// Author: Ace Baugh
// Date: December 1, 2022
// Description: MongoDB model for the customer collection

// Require statements
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schemas
const lineItemSchema = new Schema({
   name: { type: String },
   price: { type: Number },
   quantity: { type: Number }
});

const invoiceSchema = new Schema({
   subtotal: { type: Number },
   tax: { type: Number },
   dateCreated: { type: string },
   dateShipped: { type: string },
   lineItems: [lineItemSchema]
});

// Create a new schema for the customer collection
const customerSchema = new Schema({
   firstName: { type: String },
   lastName: { type: String },
   userName: { type: String },
   invoices: [invoiceSchema]
});

// Export Customer
module.exports = mongoose.model('Customer', customerSchema);