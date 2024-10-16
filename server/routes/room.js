import express from 'express';
import { getRoomMessages } from '../services/room.js';
var router = express.Router();

router.get('/:roomId', async function(req, res, next) {
    const messages = await getRoomMessages(req.params.roomId);
    res.send(messages);
});

export default router;
