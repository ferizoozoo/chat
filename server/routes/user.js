import express from 'express';
import { addUser, getUser } from '../services/user.js';
var router = express.Router();

router.post('/', async function(req, res, next) {
    const user = addUser(req.body);
    res.send(user);
});

router.get('/', async function(req, res, next) {
    const user = await getUser(req.ip.toString(), req.body.username);
    res.send(user);
});

export default router;
