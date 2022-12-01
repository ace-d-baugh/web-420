// Title: baugh-node-shopper-routes.js
// Author: Ace Baugh
// Date: December 1, 2022
// Description: API routes for the baugh-customer collection

// Require statements
const express = require('express');
const Customer = require('../models/baugh-customer');

// Create router variable
const router = express.Router();

//Create a new customer
/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     description: API for creating a new customer document
 *     summary: Creates a new customer
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers', async (req, res) => {
	try {
		// Create a new customer document
		const newCustomer = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName,
		};
		// Create a new customer document
		Customer.create(newCustomer, function (err, customer) {
			if (err) {
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(customer);
				res.json(customer);
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: 'Server Exception',
		});
	}
});

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     description: API for creating customer invoice
 *     summary: creates an invoice document within the customer
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: username to search the collection
 *         schema:
 *           type: string
 *     requestBody:
 *       description: invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       '200':
 *         description: invoice created
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers/:username/invoices', async (req, res) => {
	const user = req.params.username;
	try {
		Customer.findOne({ userName: user }, function (err, customer) {
			// invoice variable
			let newInvoice = {
				subtotal: req.body.subtotal,
				tax: req.body.tax,
				dateCreated: req.body.dateCreated,
				dateShipped: req.body.dateShipped,
				lineItems: req.body.lineItems,
			};
			if (err) {
				// unsuccessful query
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				console.log(customer);
				customer.invoices.push(newInvoice);
				customer.save(function (err, invoice) {
					if (err) {
						console.log(err);
					} else {
						console.log(invoice);
						res.json(invoice);
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: `Server Exception: ${error.message}`,
		});
	}
});

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:
 *     summary:
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: username to search the collection
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/customers/:username/invoices', async (req, res) => {
	try {
		// mongodb query
		Customer.findOne({ username: req.params.username }, function (err, customer) {
			if (err) {
				// couldn't find the user
				console.log(err);
				res.status(501).send({
					message: `MongoDB Exception: ${err}`,
				});
			} else {
				//user found
				console.log(customer.invoices);
				res.json(customer.invoices);
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: `Server Exception: ${error.message}`,
		});
	}
});

module.exports = router;
