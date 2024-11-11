import express from 'express';
import { addMessage, getMessage } from '../services/message.js';
var router = express.Router();

/**
 * Retrieves message.
 *
 * @route GET /:messageId
 * @group Message - Operations related to messages
 * @param {string} req.params.messageId - The Message ID
 * @returns {Object} 200 - The retrieved message
 * @returns {Error} 404 - Message not found
 */
router.get('/:messageId', async function(req, res, next) {
    const messages = await getMessage(req.params.messageId);
    res.send(messages);
});

/**
 * Add a message to the specified room.
 *
 * @route GET /:roomId
 * @group Message - Operations related to messages
 * @param {string} req.body.userId - The sender ID
 * @param {string} req.body.text - The text sent by the sender
 * @param {string} req.params.roomId - The room ID
 * @returns {Object} 200 - Operation successful
 */
router.post('/:roomId', async function(req, res, next) {
    const [ userId, text ] = req.body;
    const roomId = req.params.roomId;
    await addMessage(userId, text, roomId);
});

export default router;
