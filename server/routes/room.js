import express from 'express';
import { createRoom, getRoomMessages, getAvailableRooms, getUserRooms } from '../services/room.js';
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
 * Retrieves rooms of a user.
 *
 * @route GET /user/:userId
 * @group Room - Operations related to rooms
 * @param {string} req.params.userId- The User ID
 * @returns {Object} 200 - The retrieved rooms of a user 
 * @returns {Error} 404 - Rooms not found
 */
router.get('/user/:userId', async function(req, res, next) {
    const messages = await getUserRooms(req.params.userId);
    res.send(messages);
});

/**
 * Retrieves available rooms.
 *
 * @route GET /
 * @group Room - Operations related to rooms
 * @returns {Object} 200 - The retrieved available rooms 
 * @returns {Error} 404 - Rooms not found
 */
router.get('/', async function(req, res, next) {
    const messages = await getAvailableRooms();
    res.send(messages);
});

/**
 * Creates a room.
 *
 * @route POST /
 * @group Room - Operations related to Rooms
 * @param {string} req.body.title the title of the room
 * @param {string} req.body.members an array of userIDs to be a member of the room
 * @returns {Object} 200 - The created room
 */
router.post('/', async function(req, res, next) {
    const messages = await createRoom(req.body.title, req.body.members);
    res.send(messages);
});

export default router;
