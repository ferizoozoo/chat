import express from 'express';
import { addMessage, getMessage } from '../services/message.js';
var router = express.Router();

router.get('/:messageId', async function(req, res, next) {
    const messages = await getMessage(req.params.messageId);
    res.send(messages);
});

router.post('/:roomId', async function(req, res, next) {
    const [ userId, text ] = req;
    const roomId = req.params.roomId;
    await addMessage(userId, text, roomId);
});

export default router;
