import express from 'express';
import { addUser, getUser } from '../services/user.js';
var router = express.Router();

/**
 * Adds a new user to the system.
 *
 * @route POST /
 * @group User - Operations related to users
 * @param {Object} req.body - The request body
 * @param {string} req.body.username - The user's username
 * @param {string} req.body.email - The user's email
 * @returns {Object} 200 - The newly created user object
 * @returns {Error}  default - Unexpected error
 */
router.post('/', async function(req, res, next) {
    const user = await addUser({ ...req.body, ip: req.ip });
    res.send(user);
});

/**
 * Retrieves a user by IP and username.
 *
 * @route GET /
 * @group User - Operations related to users
 * @param {string} req.ip - The IP address of the client
 * @param {string} req.params.username - The username of the user to retrieve
 * @returns {Object} 200 - The retrieved user object
 * @returns {Error} 404 - User not found
 */
router.get('/:username', async function(req, res, next) {
    const user = await getUser(req.ip.toString(), req.params.username);
    res.send(user);
});

export default router;
