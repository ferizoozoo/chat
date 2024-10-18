import express from 'express';
import { createRoom, getRoomMessages } from '../services/room.js';
var router = express.Router();

/**
 * Retrieves messages of a room.
 *
 * @route GET /:roomId
 * @group Room - Operations related to rooms
 * @param {string} req.params.roomId - The Room ID
 * @returns {Object} 200 - The retrieved messages of a room
 * @returns {Error} 404 - Room messages not found
 */
router.get('/:roomId', async function(req, res, next) {
    const messages = await getRoomMessages(req.params.roomId);
    res.send(messages);
});

/**
 * Creates a room.
 *
 * @route POST /
 * @group Room - Operations related to Rooms
 * @param {string} req.body an array of userIDs to be a member of the room
 * @returns {Object} 200 - The created room
 */
router.post('/', async function(req, res, next) {
    const messages = await createRoom(req.body);
    res.send(messages);
});

export default router;
